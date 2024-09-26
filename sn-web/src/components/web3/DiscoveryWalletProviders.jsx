import { useState } from "react";
import { useSyncProviders } from "../../hooks/useSyncProviders";
import { formatAddress } from "../../utilities/web3Helpers";
import { setWallet, clearWallet } from "../../redux/users/users";
import { useDispatch, useSelector } from "react-redux";

// Needs to be modified to be both work with our redux and fit nicely into the header

export const DiscoverWalletProviders = () => {
	const dispatch = useDispatch();
	const [isOpen, setIsOpen] = useState(false);
	const wallet = useSelector((state) => state.user.wallet);
	const providers = useSyncProviders();
	console.log({ providers });
	// Connect to the selected provider using eth_requestAccounts.
	const handleConnect = async (provider) => {
		try {
			const accounts = await provider.provider.request({
				method: "eth_requestAccounts",
			});

			dispatch(
				setWallet({ address: accounts[0], provider: provider.info.name })
			);

			setIsOpen(false);
		} catch (error) {
			console.error("Error connecting to provider:", error);
		}
	};

	const handleDisconnect = () => {
		dispatch(clearWallet());
	};

	// Display detected providers as connect buttons.
	return (
		<div className="wallet-connection">
			<button className="wallet-connect-btn" onClick={() => setIsOpen(!isOpen)}>
				{wallet.address ? formatAddress(wallet.address) : "Connect Wallet"}
			</button>
			{isOpen && !wallet.address && (
				<div className="wallet-dropdown">
					{providers.map((provider) => (
						<button
							key={provider.info.uuid}
							onClick={() => handleConnect(provider)}
							className="wallet-option"
						>
							<img
								src={provider.info.icon}
								className="wallet-icon"
								alt={provider.info.name}
							/>
							<span>{provider.info.name}</span>
						</button>
					))}
				</div>
			)}
			{wallet.address && (
				<button className="wallet-disconnect-btn" onClick={handleDisconnect}>
					Disconnect
				</button>
			)}
		</div>
	);
};
