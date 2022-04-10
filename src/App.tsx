import React, {useState, useEffect} from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import {ListEditor} from "./ListEditor";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {auth, Providers} from './config/firebase';
import { SignInWithSocialMedia } from './auth';
import firebase from "firebase/app";
import {Repository} from './db/repository';
import './custom.scss';

interface UserState {
    isAuthenticated: boolean;
    name: string;
}

export default function App(this: any){
    const [startDate, setStartDate] = useState(new Date());
    const [error, setError] = useState<string>('');
    const [user, setUser] = useState<UserState>({isAuthenticated:false, name:""});
    let repo: Repository = new Repository();
    const [entries, setEntries] = useState<string>('');
    const [showResults, setShowResults] = React.useState(false)

    // Monitor and Update user state.
    useEffect(() => {

        auth.onAuthStateChanged(user => {
            if (user) {
                let displayName:string = auth.currentUser?.displayName!;
                let uid:string = auth.currentUser?.uid!;
                setUser({isAuthenticated:true,name:displayName});
                fetchData(uid);
            } else {
                console.log('No user detected');
                setUser({isAuthenticated:false,name:""});
                noUserDefault();
            }
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async (uid:string) => {
        const date = startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getDate();
        repo.getAllGratitudeByUserAndDate(date, uid).then(
            result => {
                if (result) {
                    setEntries(result);
                }else{
                    setEntries("1. ");
                }
        }
        );
    }

    const noUserDefault = async() => {
        setEntries("1. ");
    }

    // commented out to find out the problem
    useEffect(() => {
        let uid:string = auth.currentUser?.uid!;
        fetchData(uid);

    }, [startDate])

    const signInWithSocialMedia = (provider: firebase.auth.AuthProvider) => {
        if (error !== '') setError('');

        SignInWithSocialMedia(provider)
            .then(result => {
                setUser({isAuthenticated:true,name:result.user?.displayName!})
            })
            .catch(error => {
                setError(error.message);
            });
    }

    const isLoggedIn = user.isAuthenticated;
    let button;
    if (isLoggedIn) {
        button = <LogoutButton onClick={handleLogoutClick} />;
    } else {
        button = <LoginButton onClick={handleLoginClick} />;
    }

    function LoginButton(props) {
        return (
            <button className="header-icon" onClick={props.onClick}>
                <FontAwesomeIcon icon={faSignInAlt} />
            </button>
        );
    }

    const SaveAlert = () => (
        <div className="alert alert-success" role="alert">
            Saved
        </div>
    )

    function resetAlert() {
        setTimeout(() => {
            setShowResults(false);
        }, 1000);
    }
    function LogoutButton(props) {
        return (
            <button className="header-icon" onClick={props.onClick}>
                <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
        );
    }

    function handleLoginClick() {
        signInWithSocialMedia(Providers.google);
        setUser({isAuthenticated: true, name:""});
    }

    function handleLogoutClick() {
        setUser({isAuthenticated: false, name:""});
    }

    function saveEntries(){
        const date = startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getDate();
        repo.create(entries, date);
        setShowResults(true);
        resetAlert();
    }

    function onChange(newName) {
        setEntries(newName);
    }

    function handleDateChange(date) {
         setStartDate(date);
    }

  return (
      <div className="container-fluid">
          <div className="row header-border">
              <div className="col-md-6 offset-md-3 ">
                  <nav className="navbar navbar-expand-lg ">
                      <div className="navbar-brand" ><h3 className="display-4">Thankful Diary</h3></div>
                      <div className="justify-content-end div-style" id="navbarNav">
                          <ul className="navbar-nav">
                              <li className="nav-item">
                                  {button}
                              </li>
                          </ul>
                      </div>
                  </nav>
              </div>
              <div className="col-md-6 offset-md-3 ">
                  <h6 className="display-6 center-grid">before you begin your day, list 10 things you're grateful for</h6>
              </div>
          </div>
          <div className="row">
              <div className="col-md-3"/>
              <div className="col-md-6">
                  <div className="subheader">
                      <div className="subheader-greet">
                        Welcome {user.name}
                      </div>
                      <div className="subheader-calendar align-right">
                          <DatePicker selected={startDate} wrapperClassName="datePicker" onChange={handleDateChange} />
                      </div>
                  </div>
              </div>
              <div className="col-md-3"/>
          </div>

          <div className="row">
              <div className="col-md-6 offset-md-3">
                  <ListEditor entry={entries} onEntryChange={onChange}/>
              </div>
          </div>

          <div className="row">
              <div className="col-md-3">
              </div>
              <div className="col-md-6 offset-md-2">
                  <div className="subheader">
                      <div className="subheader-greet">
                          { showResults ? <SaveAlert /> : null }
                      </div>
                      <div className="subheader-calendar button-align-right">
                          <button type="button" className="btn btn-primary btn-lg button-align"
                                  onClick={saveEntries}>Save</button>
                      </div>
                  </div>
              </div>
              <div className="col-md-3"/>
          </div>

          <div className="footer">
              <div className="display-6 center-grid">
                  <b>CONTACT US</b>
              </div>
              <div className="display-6 center-grid">
                  maxcloud.co@gmail.com
              </div>
          </div>
      </div>
  );
}
