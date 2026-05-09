import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext(null);

/**
 * PROVIDER (wraps the app)
 */
export const UserProvider = ({ children }) => {
    const [address, setAddress] = useState(null);
    const [connected, setConnected] = useState(false);

    const checkConnection = async () => {
        if (!window.ethereum) return;

        try {
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            if (accounts.length > 0) {
                setAddress(accounts[0]);
                setConnected(true);
            } else {
                setAddress(null);
                setConnected(false);
            }
        } catch (err) {
            console.error("Wallet check failed:", err);
        }
    };

    const connectWallet = async () => {
        if (!window.ethereum) {
            alert("MetaMask not installed");
            return;
        }

        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            if (accounts.length > 0) {
                setAddress(accounts[0]);
                setConnected(true);
            }
        } catch (err) {
            console.error("Wallet connection failed:", err);
        }
    };

    useEffect(() => {
        checkConnection();

        if (window.ethereum) {
            const handleAccountsChanged = async () => {
                try {
                    const accounts = await window.ethereum.request({
                        method: "eth_accounts",
                    });

                    if (accounts && accounts.length > 0) {
                        setAddress(accounts[0]);
                        setConnected(true);
                    } else {
                        setAddress(null);
                        setConnected(false);
                    }
                } catch (err) {
                    console.error("Account refresh failed:", err);
                    setAddress(null);
                    setConnected(false);
                }
            };

            window.ethereum.on("accountsChanged", handleAccountsChanged);

            // optional cleanup (good practice)
            return () => {
                window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
            };
        }
    }, []);

    return (
        <UserContext.Provider value={{ address, connected, connectWallet }}>
            {children}
        </UserContext.Provider>
    );
};

/**
 * HOOK (used inside components)
 */
export const useUserProvider = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUserProvider must be used inside UserProvider");
    }

    return context;
};