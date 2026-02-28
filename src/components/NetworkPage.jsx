import React, { useState } from "react";
import styled from "styled-components";
import { networkSuggestions } from "../data/satiricalContent";

const Container = styled.div`
	max-width: 1128px;
	margin: 24px auto;
	padding: 0 16px;
	display: grid;
	grid-template-columns: 300px 1fr;
	gap: 24px;

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
		padding-bottom: 72px;
	}
`;

const Sidebar = styled.aside`
	position: sticky;
	top: 60px;
	align-self: start;
	max-height: calc(100vh - 68px);
	overflow-y: auto;
	&::-webkit-scrollbar {
		width: 0;
	}
	@media (max-width: 768px) {
		display: none;
	}
`;

const Card = styled.div`
	background: #fff;
	border-radius: 8px;
	box-shadow: 0 0 0 1px rgb(0 0 0 / 15%);
	overflow: hidden;
`;

const ManageCard = styled(Card)`
	padding: 16px 0;
`;

const ManageTitle = styled.h3`
	font-size: 16px;
	font-weight: 600;
	color: rgba(0, 0, 0, 0.9);
	padding: 0 16px 12px;
	margin: 0;
	border-bottom: 1px solid rgba(0, 0, 0, 0.08);
`;

const ManageRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 16px;
	cursor: pointer;
	color: rgba(0, 0, 0, 0.6);
	font-size: 14px;

	&:hover {
		background: rgba(0, 0, 0, 0.04);
	}

	span:last-child {
		color: rgba(0, 0, 0, 0.9);
		font-weight: 600;
	}
`;

const Main = styled.main``;

const InvitationsCard = styled(Card)`
	padding: 16px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 16px;
`;

const InvitationsText = styled.span`
	font-size: 14px;
	color: rgba(0, 0, 0, 0.6);
`;

const ManageLink = styled.a`
	color: rgba(0, 0, 0, 0.6);
	font-size: 14px;
	font-weight: 600;
	text-decoration: none;
	cursor: pointer;

	&:hover {
		text-decoration: underline;
	}
`;

const TabsRow = styled.div`
	display: flex;
	gap: 24px;
	margin-bottom: 8px;
`;

const Tab = styled.button`
	background: none;
	border: none;
	padding: 12px 0;
	font-size: 14px;
	font-weight: 600;
	cursor: pointer;
	color: ${(props) => (props.$active ? "rgba(0, 0, 0, 0.9)" : "rgba(0, 0, 0, 0.6)")};
	border-bottom: ${(props) => (props.$active ? "2px solid rgba(0, 0, 0, 0.9)" : "2px solid transparent")};

	&:hover {
		color: rgba(0, 0, 0, 0.9);
	}
`;

const PremiumCardWrapper = styled(Card)`
	padding: 16px;
	margin-bottom: 16px;
	position: relative;
`;

const PremiumDismiss = styled.button`
	position: absolute;
	top: 12px;
	right: 12px;
	background: none;
	border: none;
	cursor: pointer;
	font-size: 18px;
	color: rgba(0, 0, 0, 0.6);
	line-height: 1;
	padding: 4px;

	&:hover {
		color: rgba(0, 0, 0, 0.9);
	}
`;

const PremiumTitle = styled.h3`
	font-size: 16px;
	font-weight: 600;
	color: rgba(0, 0, 0, 0.9);
	margin: 0 0 4px;
`;

const PremiumDesc = styled.p`
	font-size: 14px;
	color: rgba(0, 0, 0, 0.6);
	margin: 0 0 12px;
	padding-right: 24px;
`;

const AvatarRow = styled.div`
	display: flex;
	margin-bottom: 12px;
`;

const AvatarPlaceholder = styled.div`
	width: 32px;
	height: 32px;
	border-radius: 50%;
	background: #e0e0e0;
	border: 2px solid #fff;
	margin-left: ${(props) => (props.$offset ? "-8px" : "0")};
`;

const PremiumButton = styled.button`
	background: #915907;
	color: #fff;
	border: none;
	border-radius: 20px;
	padding: 8px 20px;
	font-size: 14px;
	font-weight: 600;
	cursor: pointer;
	display: block;
	margin-bottom: 8px;

	&:hover {
		background: #7a4b06;
	}
`;

const PremiumFine = styled.p`
	font-size: 12px;
	color: rgba(0, 0, 0, 0.6);
	margin: 0;
`;

const SectionHeaderRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 16px 0 12px;
`;

const SectionHeader = styled.h2`
	font-size: 16px;
	font-weight: 400;
	color: rgba(0, 0, 0, 0.9);
	margin: 0;
`;

const ShowAllLink = styled.a`
	font-size: 14px;
	color: rgba(0, 0, 0, 0.6);
	font-weight: 600;
	text-decoration: none;
	cursor: pointer;
	&:hover {
		text-decoration: underline;
		color: #0a66c2;
	}
`;

const PeopleGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 12px;

	@media (max-width: 768px) {
		grid-template-columns: repeat(2, 1fr);
	}
`;

const PersonCard = styled(Card)`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
`;

const CardHeader = styled.div`
	width: 100%;
	height: 56px;
	background: ${(props) => props.color || "linear-gradient(135deg, #0a66c2, #004182)"};
	border-radius: 8px 8px 0 0;
`;

const DismissButton = styled.button`
	position: absolute;
	top: 8px;
	right: 8px;
	background: rgba(255, 255, 255, 0.85);
	border: none;
	border-radius: 50%;
	width: 24px;
	height: 24px;
	cursor: pointer;
	font-size: 14px;
	line-height: 24px;
	text-align: center;
	color: rgba(0, 0, 0, 0.6);

	&:hover {
		background: #fff;
	}
`;

const Avatar = styled.img`
	width: 72px;
	height: 72px;
	border-radius: 50%;
	border: 2px solid #fff;
	margin-top: -36px;
	background: #fff;
`;

const PersonName = styled.h3`
	font-size: 14px;
	font-weight: 600;
	color: rgba(0, 0, 0, 0.9);
	margin: 8px 0 4px;
	padding: 0 12px;
`;

const PersonHeadline = styled.p`
	font-size: 12px;
	color: rgba(0, 0, 0, 0.6);
	margin: 0;
	padding: 0 12px;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	min-height: 32px;
`;

const MutualText = styled.p`
	font-size: 12px;
	color: rgba(0, 0, 0, 0.6);
	margin: 8px 0;
`;

const ConnectButton = styled.button`
	border: 1px solid #0a66c2;
	color: #0a66c2;
	background: transparent;
	border-radius: 16px;
	padding: 6px 16px;
	font-weight: 600;
	font-size: 14px;
	cursor: pointer;
	margin-bottom: 16px;

	&:hover {
		background: rgba(10, 102, 194, 0.08);
		border-width: 2px;
		padding: 5px 15px;
	}
`;

const FooterLinks = styled.div`
	padding: 16px 0;
	text-align: left;
	a {
		font-size: 11px;
		color: rgba(0, 0, 0, 0.6);
		text-decoration: none;
		cursor: pointer;
		&:hover {
			color: #0a66c2;
			text-decoration: underline;
		}
	}
	span {
		font-size: 11px;
		color: rgba(0, 0, 0, 0.6);
	}
`;

const FooterCopyright = styled.div`
	font-size: 11px;
	color: rgba(0, 0, 0, 0.6);
	margin-top: 8px;
`;

const GRADIENTS = [
	"linear-gradient(135deg, #0a66c2, #004182)",
	"linear-gradient(135deg, #057642, #03452a)",
	"linear-gradient(135deg, #b24020, #7c2d15)",
	"linear-gradient(135deg, #7c3aed, #5521b5)",
	"linear-gradient(135deg, #e16b16, #b24d08)",
	"linear-gradient(135deg, #0a66c2, #7c3aed)",
];

function NetworkPage() {
	const [showPremium, setShowPremium] = useState(true);

	return (
		<Container>
			<Sidebar>
				<ManageCard>
					<ManageTitle>Manage my network</ManageTitle>
					<ManageRow>
						<span>Connections</span>
						<span>720</span>
					</ManageRow>
					<ManageRow>
						<span>Following & followers</span>
						<span></span>
					</ManageRow>
					<ManageRow>
						<span>Groups</span>
						<span>7</span>
					</ManageRow>
					<ManageRow>
						<span>Events</span>
						<span>2</span>
					</ManageRow>
					<ManageRow>
						<span>Pages</span>
						<span>117</span>
					</ManageRow>
					<ManageRow>
						<span>Newsletters</span>
						<span>1</span>
					</ManageRow>
				</ManageCard>
				<FooterLinks>
					<a href="#">About</a><span> &middot; </span>
					<a href="#">Accessibility</a><span> &middot; </span>
					<a href="#">Help Center</a>
					<br />
					<a href="#">Privacy & Terms</a><span> &middot; </span>
					<a href="#">Ad Choices</a><span> &middot; </span>
					<a href="#">Advertising</a>
					<br />
					<a href="#">Business Services</a><span> &middot; </span>
					<a href="#">Get the LinkedOut app</a>
					<br />
					<a href="#">More</a>
					<FooterCopyright>LinkedOut Corporation &copy; 2026</FooterCopyright>
				</FooterLinks>
			</Sidebar>
			<Main>
				<TabsRow>
					<Tab $active>Grow</Tab>
					<Tab>Catch up</Tab>
				</TabsRow>
				<InvitationsCard>
					<InvitationsText>No pending invitations</InvitationsText>
					<ManageLink>Manage</ManageLink>
				</InvitationsCard>
				{showPremium && (
					<PremiumCardWrapper>
						<PremiumDismiss onClick={() => setShowPremium(false)}>&times;</PremiumDismiss>
						<PremiumTitle>Achieve your goals faster with Premium</PremiumTitle>
						<PremiumDesc>
							See who's viewed your profile and directly message members outside of your network.
						</PremiumDesc>
						<AvatarRow>
							<AvatarPlaceholder />
							<AvatarPlaceholder $offset />
							<AvatarPlaceholder $offset />
							<AvatarPlaceholder $offset />
						</AvatarRow>
						<PremiumButton>Try Premium for A$0</PremiumButton>
						<PremiumFine>1 month free. Easy to cancel. No penalties or fees.</PremiumFine>
					</PremiumCardWrapper>
				)}
				<SectionHeaderRow>
					<SectionHeader>People you may know in Greater Sydney Area</SectionHeader>
					<ShowAllLink href="#">Show all</ShowAllLink>
				</SectionHeaderRow>
				<PeopleGrid>
					{networkSuggestions.map((person, idx) => (
						<PersonCard key={idx}>
							<CardHeader color={GRADIENTS[idx % GRADIENTS.length]} />
							<DismissButton>&times;</DismissButton>
							<Avatar src={person.photoUrl} alt={person.name} />
							<PersonName>{person.name}</PersonName>
							<PersonHeadline>{person.headline}</PersonHeadline>
							<MutualText>{person.mutualConnections} mutual connections</MutualText>
							<ConnectButton>Connect</ConnectButton>
						</PersonCard>
					))}
				</PeopleGrid>
			</Main>
		</Container>
	);
}

export default NetworkPage;
