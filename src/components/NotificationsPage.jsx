import React, { useState } from "react";
import styled from "styled-components";
import { notifications } from "../data/satiricalContent";

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

const SidebarCard = styled(Card)`
	padding: 16px;
`;

const SidebarIcon = styled.div`
	width: 72px;
	height: 72px;
	border-radius: 50%;
	background: #e7e7e7;
	margin: 0 auto 8px;
`;

const ProfileName = styled.h3`
	font-size: 16px;
	font-weight: 600;
	color: rgba(0, 0, 0, 0.9);
	text-align: center;
	margin: 0 0 4px;
`;

const ProfileHeadline = styled.p`
	font-size: 12px;
	color: rgba(0, 0, 0, 0.6);
	text-align: center;
	margin: 0;
	line-height: 1.4;
`;

const SidebarDivider = styled.hr`
	border: none;
	border-top: 1px solid rgba(0, 0, 0, 0.08);
	margin: 12px 0 0;
`;

const SidebarLink = styled.a`
	display: block;
	padding: 10px 0;
	color: rgba(0, 0, 0, 0.6);
	font-size: 14px;
	font-weight: 600;
	text-decoration: none;
	cursor: pointer;
	border-bottom: 1px solid rgba(0, 0, 0, 0.08);

	&:last-of-type {
		border-bottom: none;
	}

	&:hover {
		text-decoration: underline;
		color: #0a66c2;
	}
`;

const Main = styled.main``;

const TabBar = styled.div`
	display: flex;
	gap: 4px;
	margin-bottom: 8px;
`;

const Tab = styled.button`
	padding: 8px 16px;
	border: none;
	border-radius: 16px;
	font-size: 14px;
	font-weight: 600;
	cursor: pointer;
	background: ${(props) => (props.$active ? "#057642" : "transparent")};
	color: ${(props) => (props.$active ? "#fff" : "rgba(0,0,0,0.6)")};

	&:hover {
		background: ${(props) => (props.$active ? "#057642" : "rgba(0,0,0,0.08)")};
	}
`;

const NotificationList = styled(Card)``;

const NotificationItem = styled.div`
	display: flex;
	align-items: flex-start;
	padding: 12px 16px;
	gap: 12px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.08);
	cursor: pointer;

	&:hover {
		background: rgba(0, 0, 0, 0.02);
	}

	&:last-child {
		border-bottom: none;
	}
`;

const NotifAvatar = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	flex-shrink: 0;
`;

const NotifContent = styled.div`
	flex: 1;
	min-width: 0;
`;

const NotifText = styled.p`
	font-size: 14px;
	color: rgba(0, 0, 0, 0.9);
	margin: 0 0 4px;
	line-height: 1.4;
`;

const NotifTime = styled.span`
	font-size: 12px;
	color: rgba(0, 0, 0, 0.6);
`;

const PreviewCard = styled.div`
	margin-top: 8px;
	padding: 10px 12px;
	background: rgba(0, 0, 0, 0.04);
	border-radius: 4px;
	border-left: 3px solid #0a66c2;
`;

const PreviewTitle = styled.p`
	font-size: 12px;
	color: rgba(0, 0, 0, 0.6);
	margin: 0;
	font-weight: 600;
`;

const MenuButton = styled.button`
	background: none;
	border: none;
	cursor: pointer;
	color: rgba(0, 0, 0, 0.6);
	font-size: 18px;
	padding: 4px 8px;
	border-radius: 50%;
	flex-shrink: 0;
	line-height: 1;
	letter-spacing: 1px;

	&:hover {
		background: rgba(0, 0, 0, 0.08);
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

const TABS = ["All", "Jobs", "My posts", "Mentions"];

function NotificationsPage() {
	const [activeTab, setActiveTab] = useState("All");

	const filteredNotifications =
		activeTab === "All"
			? notifications
			: notifications.filter((n) => {
					if (activeTab === "Jobs") return n.type === "job";
					if (activeTab === "My posts") return n.type === "like" || n.type === "comment";
					if (activeTab === "Mentions") return n.type === "mention";
					return true;
			  });

	return (
		<Container>
			<Sidebar>
				<SidebarCard>
					<SidebarIcon />
					<ProfileName>Harold</ProfileName>
					<ProfileHeadline>Disrupting the disruption industry</ProfileHeadline>
					<SidebarDivider />
					<SidebarLink>Manage your notifications</SidebarLink>
					<SidebarLink>View settings</SidebarLink>
				</SidebarCard>
				<FooterLinks>
					<a href="#">About</a><span> &middot; </span>
					<a href="#">Accessibility</a><span> &middot; </span>
					<a href="#">Help Center</a>
					<br />
					<a href="#">Privacy & Terms</a><span> &middot; </span>
					<a href="#">Ad Choices</a>
					<br />
					<a href="#">Advertising</a><span> &middot; </span>
					<a href="#">Business Services</a>
					<br />
					<a href="#">Get the LinkedOut app</a><span> &middot; </span>
					<a href="#">More</a>
					<FooterCopyright>LinkedOut Corporation &copy; 2026</FooterCopyright>
				</FooterLinks>
			</Sidebar>
			<Main>
				<TabBar>
					{TABS.map((tab) => (
						<Tab key={tab} $active={activeTab === tab} onClick={() => setActiveTab(tab)}>
							{tab}
						</Tab>
					))}
				</TabBar>
				<NotificationList>
					{filteredNotifications.map((notif, idx) => (
						<NotificationItem key={idx}>
							<NotifAvatar src={notif.photoUrl} alt="" />
							<NotifContent>
								<NotifText>{notif.text}</NotifText>
								<NotifTime>{notif.time}</NotifTime>
								{notif.hasPreview && (
									<PreviewCard>
										<PreviewTitle>{notif.previewTitle}</PreviewTitle>
									</PreviewCard>
								)}
							</NotifContent>
							<MenuButton>...</MenuButton>
						</NotificationItem>
					))}
				</NotificationList>
			</Main>
		</Container>
	);
}

export default NotificationsPage;
