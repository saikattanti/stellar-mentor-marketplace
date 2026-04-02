import React from "react";
import { Link } from "react-router-dom";
import { CONTRACT_ID } from "../../lib/stellar.js";
import "./LandingPage.css";

const truncateId = (value) => {
    if (!value || value.length < 22) return value;
    return `${value.slice(0, 10)}...${value.slice(-8)}`;
};

export default function LandingPage() {
    const stellarExpertUrl = `https://stellar.expert/explorer/testnet/contract/${CONTRACT_ID}`;

    return (
        <div className="landing-page-shell">
            <section className="landing-screen">
                <header className="landing-nav">
                    <div className="brand-mark">Stellar Mentor</div>
                    <div className="nav-actions">
                        <span className="network-pill">Live on Stellar Testnet</span>
                        <Link className="nav-connect-btn" to="/app">Open App</Link>
                    </div>
                </header>

                <div className="landing-content">
                    <p className="landing-kicker">Professional On-Chain Mentorship Platform</p>
                    <h1>
                        Build Skills With
                        <span> Transparent, Tamper-Proof </span>
                        Mentor Workflows
                    </h1>
                    <p className="landing-subtitle">
                        Register mentors, request sessions, complete milestones, and rate outcomes through Soroban smart contracts with wallet-authenticated actions.
                    </p>

                    <div className="landing-cta-row">
                        <Link to="/app" className="cta-primary">Launch App</Link>
                        <a className="cta-secondary" href={stellarExpertUrl} target="_blank" rel="noreferrer">View Contract</a>
                    </div>

                    <div className="landing-stats">
                        <article>
                            <strong>100%</strong>
                            <span>On-Chain Records</span>
                        </article>
                        <article>
                            <strong>Secure</strong>
                            <span>Wallet Authorization</span>
                        </article>
                        <article>
                            <strong>Soroban</strong>
                            <span>Smart Contract Engine</span>
                        </article>
                        <article>
                            <strong>{truncateId(CONTRACT_ID)}</strong>
                            <span>Deployed Contract</span>
                        </article>
                    </div>
                </div>
            </section>
        </div>
    );
}
