import React, {useState, useEffect} from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ListEditor} from "./ListEditor";
import "react-datepicker/dist/react-datepicker.css";
import {auth, Providers} from './config/firebase';
import {SignInWithSocialMedia} from './auth';
import firebase from "firebase/app";
import {Repository} from './db/repository';
import './custom.scss';
import {DatePicker} from "./component/DatePicker";

interface UserState {
    isAuthenticated: boolean;
    name: string;
}

export default function App(this: any) {
    const [startDate, setStartDate] = useState(new Date());
    const [error, setError] = useState<string>('');
    const [user, setUser] = useState<UserState>({isAuthenticated: false, name: ""});
    let repo: Repository = new Repository();
    const [entries, setEntries] = useState<string>('');
    const [showResults, setShowResults] = React.useState(false)
    const [dateEntries, setDateEntries] = useState<Date[]>([]);
    const [markedDates, setMarkedDates] = useState<any[]>([]);// need to find the type

    // Monitor and Update user state.
    useEffect(() => {

        auth.onAuthStateChanged(user => {
            if (user) {
                let displayName: string = auth.currentUser?.displayName!;
                let uid: string = auth.currentUser?.uid!;
                setUser({isAuthenticated: true, name: displayName});
                fetchData(uid);
                repo.getGratitudeDateByUser(uid)
                    .then(v => {
                        v.forEach(s => setDateEntries(oldArray => [...oldArray, s.toDate()]));
                        constructMarkedDates();
                    });
            } else {
                console.log('No user detected');
                setUser({isAuthenticated: false, name: ""});
                noUserDefault();
            }
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [markedDates]);

    const fetchData = async (uid: string) => {
        const date = startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getDate();
        repo.getAllGratitudeByUserAndDate(date, uid).then(
            result => {
                if (result) {
                    setEntries(result);
                } else {
                    setEntries("1. ");
                }
            }
        );
    }

    const noUserDefault = async () => {
        setEntries("1. ");
    }

    // commented out to find out the problem
    useEffect(() => {
        let uid: string = auth.currentUser?.uid!;
        fetchData(uid);

    }, [startDate])

    const signInWithSocialMedia = (provider: firebase.auth.AuthProvider) => {
        if (error !== '') setError('');

        SignInWithSocialMedia(provider)
            .then(result => {
                setUser({isAuthenticated: true, name: result.user?.displayName!})
            })
            .catch(error => {
                setError(error.message);
            });
    }

    const isLoggedIn = user.isAuthenticated;
    let button;
    if (isLoggedIn) {
        button = <LogoutButton onClick={handleLogoutClick}/>;
    } else {
        button = <LoginButton onClick={handleLoginClick}/>;
    }

    function LoginButton(props) {
        return (
            <button className="header-icon" onClick={props.onClick}>
                <img src="/login.png" className="login-logout" alt="Login"/>
            </button>
        );
    }

    function LogoutButton(props) {
        return (
            <button className="header-icon" onClick={props.onClick}>
                <img src="/exit.png" className="login-logout" alt="Logout"/>
            </button>
        );
    }

    const SaveAlert = () => (
        <div className="alert alert-success" role="alert">
            Saved ✅
        </div>
    )

    function resetAlert() {
        setTimeout(() => {
            setShowResults(false);
        }, 1000);
    }


    function handleLoginClick() {
        signInWithSocialMedia(Providers.google);
        setUser({isAuthenticated: true, name: ""});
    }

    function handleLogoutClick() {
        setUser({isAuthenticated: false, name: ""});
    }

    function saveEntries() {
        const date = startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getDate();
        repo.create(entries, date)
            .then(result => {
                setShowResults(true);
                resetAlert();
            }).catch(function (e) {
            console.log(e);
        });

    }

    function onChange(newName) {
        setEntries(newName);
    }

    function handleDateChange(date) {
        setStartDate(date);
    }

    function constructMarkedDates() {
        //console.log(e.getDate() + ' ' + e.getMonth() + ' ' + e.getFullYear())
        dateEntries.forEach(e => {
            setMarkedDates(oldArray => [...oldArray, {
                date: new Date(e.getFullYear(), e.getMonth(), e.getDate()),
                marked: true,
                style: {
                    color: "#ff0000",
                    padding: "0px",
                    margin: "0px",
                    fontSize: 12,
                },
                text: "●",
            }]);
        }
        );
    };


    return (
        <div className="container-fluid">
            <div className="row header-border">
                <div className="col-md-6 offset-md-3 ">
                    <nav className="navbar navbar-expand-lg ">
                        <div className="navbar-brand"><h3 className="display-4">Thankful Diary</h3></div>
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
                    <h6 className="display-6 center-grid">before you begin your day, list 10 things you're grateful
                        for</h6>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3"/>
                <div className="col-md-6">
                    <div className="subheader">
                        <div className="subheader-greet">
                            Welcome {user.name}
                        </div>
                    </div>
                    <div>
                        <div>
                            <DatePicker currentDate={startDate}
                                        days={366}
                                        selectDate={startDate}
                                        getSelectedDay={handleDateChange}
                                        marked={markedDates}
                                        labelFormat={"MMMM yyyy"}
                                        color={"#8bc414"}/>
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
                            {showResults ? <SaveAlert/> : null}
                        </div>
                        <div className="subheader-calendar button-align-right">
                            <button type="button"
                                    className="btn btn-primary btn-lg button-align"
                                    onClick={saveEntries}>Save
                            </button>
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
