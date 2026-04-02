import React, { useState } from "react";
import {
    CONTRACT_ID,
    checkConnection,
    registerMentor,
    requestMentorship,
    acceptMentee,
    completeSession,
    rateMentor,
    getMentor,
    listMentors,
    getMentorCount,
} from "../lib/stellar.js";
import "./App.css";

const toOutput = (value) => {
    if (typeof value === "string") return value;
    return JSON.stringify(value, null, 2);
};

const truncateAddress = (addr) => {
    if (!addr || addr.length < 12) return addr;
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
};

const truncateId = (value) => {
    if (!value || value.length < 22) return value;
    return `${value.slice(0, 10)}...${value.slice(-8)}`;
};

export default function App() {
    const [form, setForm] = useState({
        id: "mentor1",
        mentor: "",
        name: "Alice",
        expertise: "rust",
        bio: "Experienced Soroban developer",
        hourlyRate: "100",
        maxMentees: "5",
        mentee: "",
        message: "I'd like to learn Soroban",
        hours: "2",
        sessionNotes: "Covered contract basics",
        rating: "5",
    });
    const [output, setOutput] = useState("");
    const [walletState, setWalletState] = useState("Wallet: not connected");
    const [isBusy, setIsBusy] = useState(false);
    const [countValue, setCountValue] = useState("-");
    const [loadingAction, setLoadingAction] = useState(null);
    const [status, setStatus] = useState("idle");
    const [activeTab, setActiveTab] = useState(0);
    const [connectedAddress, setConnectedAddress] = useState("");

    const setField = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const runAction = async (actionName, action) => {
        setIsBusy(true);
        setLoadingAction(actionName);
        setStatus("idle");
        try {
            const result = await action();
            setOutput(toOutput(result ?? "No data found"));
            setStatus("success");
        } catch (error) {
            setOutput(error?.message || String(error));
            setStatus("error");
        } finally {
            setIsBusy(false);
            setLoadingAction(null);
        }
    };

    const onConnect = () => runAction("connect", async () => {
        const user = await checkConnection();
        const nextWalletState = user ? `Wallet: ${user.publicKey}` : "Wallet: not connected";
        setWalletState(nextWalletState);
        if (user) {
            setConnectedAddress(user.publicKey);
            setForm((prev) => ({
                ...prev,
                mentor: prev.mentor || user.publicKey,
                mentee: prev.mentee || user.publicKey,
            }));
        }
        return nextWalletState;
    });

    const onRegister = () =>
        runAction("register", async () =>
            registerMentor({
                id: form.id.trim(),
                mentor: form.mentor.trim(),
                name: form.name.trim(),
                expertise: form.expertise.trim(),
                bio: form.bio.trim(),
                hourlyRate: form.hourlyRate.trim(),
                maxMentees: form.maxMentees.trim(),
            })
        );

    const onRequestMentorship = () =>
        runAction("requestMentorship", async () =>
            requestMentorship({
                mentorId: form.id.trim(),
                mentee: form.mentee.trim(),
                message: form.message.trim(),
            })
        );

    const onAcceptMentee = () =>
        runAction("acceptMentee", async () =>
            acceptMentee({
                mentorId: form.id.trim(),
                mentor: form.mentor.trim(),
                mentee: form.mentee.trim(),
            })
        );

    const onCompleteSession = () =>
        runAction("completeSession", async () =>
            completeSession({
                mentorId: form.id.trim(),
                mentor: form.mentor.trim(),
                hours: form.hours.trim(),
                sessionNotes: form.sessionNotes.trim(),
            })
        );

    const onRate = () =>
        runAction("rate", async () =>
            rateMentor({
                mentorId: form.id.trim(),
                mentee: form.mentee.trim(),
                rating: form.rating.trim(),
            })
        );

    const onGetMentor = () => runAction("getMentor", async () => getMentor(form.id.trim()));
    const onList = () => runAction("list", async () => listMentors());

    const onCount = () =>
        runAction("count", async () => {
            const value = await getMentorCount();
            setCountValue(String(value));
            return { count: value };
        });

    const tabs = ["Register", "Mentorship", "Rate & Browse"];
    const stellarExpertUrl = `https://stellar.expert/explorer/testnet/contract/${CONTRACT_ID}`;

    return (
        <main className="app">
            <div className="wallet-status-bar">
                <span className={`wallet-dot ${connectedAddress ? "connected" : ""}`} />
                <span className="wallet-status-text">
                    {connectedAddress ? truncateAddress(connectedAddress) : "Not connected"}
                </span>
            </div>

            <section className="hero">
                <p className="eyebrow">Stellar Testnet Application</p>
                <h1>Mentor Marketplace Dashboard</h1>
                <p className="subtitle">
                    A professional interface for managing on-chain mentorship workflows with Soroban smart contracts.
                </p>

                <div className="hero-badges">
                    <span className="badge badge-solid">Contract: {truncateId(CONTRACT_ID)}</span>
                    <a className="badge badge-link" href={stellarExpertUrl} target="_blank" rel="noreferrer">
                        Open in Stellar Expert
                    </a>
                </div>

                <div className="wallet-bar">
                    <button
                        type="button"
                        id="connectWallet"
                        onClick={onConnect}
                        className={loadingAction === "connect" ? "btn-loading" : ""}
                        disabled={isBusy}
                    >
                        Connect Freighter
                    </button>
                    <button
                        type="button"
                        className={`btn-ghost-inline ${loadingAction === "count" ? "btn-loading" : ""}`}
                        onClick={onCount}
                        disabled={isBusy}
                    >
                        Refresh Mentor Count
                    </button>
                    <span className="wallet-text" id="walletState">{walletState}</span>
                </div>

                <p className="mentor-count">
                    Registered mentors: <span>{countValue}</span>
                </p>
            </section>

            <section className="landing-panels">
                <article className="landing-card">
                    <h2>Purpose</h2>
                    <p>Manage mentor profiles and interactions directly through a deployed smart contract.</p>
                </article>
                <article className="landing-card">
                    <h2>Workflow</h2>
                    <p>Register, request mentorship, accept sessions, complete hours, and rate outcomes.</p>
                </article>
                <article className="landing-card">
                    <h2>Trust Model</h2>
                    <p>All critical actions are signed with wallet authorization and recorded on-chain.</p>
                </article>
            </section>

            <section className="workspace-grid">
                <div className="workspace-main">
                    <div className="tab-bar">
                        {tabs.map((tab, i) => (
                            <button
                                key={tab}
                                type="button"
                                className={`tab-btn ${activeTab === i ? "active" : ""}`}
                                onClick={() => setActiveTab(i)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {activeTab === 0 && (
                        <section className="card profile-card">
                            <div className="card-header">
                                <h2>Register Mentor</h2>
                            </div>

                            <div className="form-grid">
                                <div className="field">
                                    <label htmlFor="id">Mentor ID (Symbol)</label>
                                    <input id="id" name="id" value={form.id} onChange={setField} />
                                    <span className="field-helper">Unique identifier for your mentor profile</span>
                                </div>
                                <div className="field">
                                    <label htmlFor="mentor">Mentor Address</label>
                                    <input id="mentor" name="mentor" value={form.mentor} onChange={setField} placeholder="G..." />
                                    <span className="field-helper">Auto-filled after wallet connection</span>
                                </div>
                                <div className="field">
                                    <label htmlFor="name">Display Name</label>
                                    <input id="name" name="name" value={form.name} onChange={setField} />
                                </div>
                                <div className="field">
                                    <label htmlFor="expertise">Expertise (Symbol)</label>
                                    <input id="expertise" name="expertise" value={form.expertise} onChange={setField} />
                                </div>
                                <div className="field full-width">
                                    <label htmlFor="bio">Bio</label>
                                    <textarea id="bio" name="bio" rows="2" value={form.bio} onChange={setField} />
                                    <span className="field-helper">Brief mentor introduction and specialization</span>
                                </div>
                                <div className="field">
                                    <label htmlFor="hourlyRate">Hourly Rate (i128)</label>
                                    <input
                                        id="hourlyRate"
                                        name="hourlyRate"
                                        value={form.hourlyRate}
                                        onChange={setField}
                                        type="number"
                                    />
                                </div>
                                <div className="field">
                                    <label htmlFor="maxMentees">Max Mentees</label>
                                    <input
                                        id="maxMentees"
                                        name="maxMentees"
                                        value={form.maxMentees}
                                        onChange={setField}
                                        type="number"
                                    />
                                </div>
                            </div>

                            <div className="actions">
                                <button
                                    type="button"
                                    className={`btn ${loadingAction === "register" ? "btn-loading" : ""}`}
                                    onClick={onRegister}
                                    disabled={isBusy}
                                >
                                    Register Mentor
                                </button>
                            </div>
                        </section>
                    )}

                    {activeTab === 1 && (
                        <section className="card">
                            <div className="card-header">
                                <h2>Mentorship Actions</h2>
                            </div>

                            <div className="form-grid">
                                <div className="field">
                                    <label htmlFor="mentee">Mentee Address</label>
                                    <input id="mentee" name="mentee" value={form.mentee} onChange={setField} placeholder="G..." />
                                    <span className="field-helper">Stellar address of the mentee</span>
                                </div>
                                <div className="field">
                                    <label htmlFor="message">Request Message</label>
                                    <input id="message" name="message" value={form.message} onChange={setField} />
                                </div>
                                <div className="field">
                                    <label htmlFor="hours">Session Hours</label>
                                    <input id="hours" name="hours" value={form.hours} onChange={setField} type="number" />
                                </div>
                                <div className="field full-width">
                                    <label htmlFor="sessionNotes">Session Notes</label>
                                    <textarea
                                        id="sessionNotes"
                                        name="sessionNotes"
                                        rows="2"
                                        value={form.sessionNotes}
                                        onChange={setField}
                                    />
                                </div>
                            </div>

                            <div className="actions">
                                <button
                                    type="button"
                                    className={`btn ${loadingAction === "requestMentorship" ? "btn-loading" : ""}`}
                                    onClick={onRequestMentorship}
                                    disabled={isBusy}
                                >
                                    Request Mentorship
                                </button>
                                <button
                                    type="button"
                                    className={`btn btn-secondary ${loadingAction === "acceptMentee" ? "btn-loading" : ""}`}
                                    onClick={onAcceptMentee}
                                    disabled={isBusy}
                                >
                                    Accept Mentee
                                </button>
                                <button
                                    type="button"
                                    className={`btn btn-secondary ${loadingAction === "completeSession" ? "btn-loading" : ""}`}
                                    onClick={onCompleteSession}
                                    disabled={isBusy}
                                >
                                    Complete Session
                                </button>
                            </div>
                        </section>
                    )}

                    {activeTab === 2 && (
                        <>
                            <section className="card">
                                <div className="card-header">
                                    <h2>Rate Mentor</h2>
                                </div>

                                <div className="form-grid">
                                    <div className="field">
                                        <label htmlFor="rating">Rating (1-5)</label>
                                        <input id="rating" name="rating" value={form.rating} onChange={setField} type="number" min="1" max="5" />
                                        <span className="field-helper">1 is lowest and 5 is highest</span>
                                    </div>
                                </div>

                                <div className="actions">
                                    <button
                                        type="button"
                                        className={`btn ${loadingAction === "rate" ? "btn-loading" : ""}`}
                                        onClick={onRate}
                                        disabled={isBusy}
                                    >
                                        Submit Rating
                                    </button>
                                </div>
                            </section>

                            <section className="card">
                                <div className="card-header">
                                    <h2>Mentor Directory</h2>
                                </div>

                                <div className="actions">
                                    <button
                                        type="button"
                                        className={`btn btn-ghost ${loadingAction === "getMentor" ? "btn-loading" : ""}`}
                                        onClick={onGetMentor}
                                        disabled={isBusy}
                                    >
                                        Get Mentor
                                    </button>
                                    <button
                                        type="button"
                                        className={`btn btn-ghost ${loadingAction === "list" ? "btn-loading" : ""}`}
                                        onClick={onList}
                                        disabled={isBusy}
                                    >
                                        List Mentors
                                    </button>
                                    <button
                                        type="button"
                                        className={`btn btn-ghost ${loadingAction === "count" ? "btn-loading" : ""}`}
                                        onClick={onCount}
                                        disabled={isBusy}
                                    >
                                        Get Count
                                    </button>
                                </div>
                            </section>
                        </>
                    )}
                </div>

                <aside className="workspace-side">
                    <section className="card output-card output-sticky">
                        <div className="card-header">
                            <h2>Execution Output</h2>
                        </div>
                        <pre id="output" className={`output-pre status-${status}`}>
                            {output || "Connect your wallet and run an action. Results and errors are shown here."}
                        </pre>
                    </section>
                </aside>
            </section>
        </main>
    );
}
