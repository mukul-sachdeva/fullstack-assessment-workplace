import React, { useEffect, useState } from 'react';
import Address from './Address';
import { getNFTStats } from '../api/requests/Transactions';
import { useUserProvider } from '../hooks';

const NFTStats = () => {
    const { address, connected } = useUserProvider();

    const [stats, setStats] = useState({ totalNFTs: 0 });
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        try {
            const response = await getNFTStats();
            setStats({ totalNFTs: response?.totalNFTs || 0 });
        } catch (err) {
            console.error(err);
            setStats({ totalNFTs: 0 });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    useEffect(() => {
        if (address) fetchStats();
    }, [address]);

    if (loading) {
        return (
            <main className="main">
                <div className="spinner">Loading...</div>
            </main>
        );
    }

    return (
        <main className="main">

            <div className="card-grid">

                {/* CARD 1: NFT COUNT */}
                <div className="card">
                    <h3>Total NFTs</h3>
                    <p>{stats.totalNFTs}</p>
                </div>

                {/* CARD 2: WALLET STATUS */}
                <div className="card">
                    <h3>Wallet Status</h3>

                    <span
                        style={{
                            color: connected ? 'green' : 'red',
                            fontWeight: 'bold'
                        }}
                    >
                        {connected ? 'Connected' : 'Disconnected'}
                    </span>

                    {connected && address && (
                        <div style={{ marginTop: 8 }}>
                            <Address address={address} size="short" />
                        </div>
                    )}
                </div>

            </div>

        </main>
    );
};

export default NFTStats;