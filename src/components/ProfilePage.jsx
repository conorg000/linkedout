import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { profileData, networkSuggestions } from "../data/satiricalContent";

const Container = styled.div`
	max-width: 1128px;
	margin: 0 auto;
	padding: 24px 16px;
	display: flex;
	gap: 24px;
	@media (max-width: 768px) {
		flex-direction: column;
		padding: 0;
		padding-bottom: 72px;
		gap: 0;
	}
`;

const MainColumn = styled.div`
	flex: 1;
	min-width: 0;
`;

const Sidebar = styled.div`
	width: 300px;
	flex-shrink: 0;
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
	margin-bottom: 8px;
	overflow: hidden;
`;

const Banner = styled.div`
	height: 200px;
	background: linear-gradient(135deg, #0a66c2, #004182);
	border-radius: 8px 8px 0 0;
`;

const ProfileHeader = styled.div`
	padding: 0 24px 24px;
	position: relative;
`;

const ProfilePhoto = styled.img`
	width: 120px;
	height: 120px;
	border-radius: 50%;
	border: 4px solid #fff;
	position: relative;
	top: -60px;
	margin-bottom: -50px;
	object-fit: cover;
	background: #fff;
`;

const ProfileName = styled.h1`
	font-size: 24px;
	font-weight: 600;
	color: rgba(0, 0, 0, 0.9);
	margin: 0;
	display: flex;
	align-items: center;
	gap: 8px;
`;

const ConnectionDegree = styled.span`
	font-size: 14px;
	font-weight: 400;
	color: rgba(0, 0, 0, 0.6);
	border: 1px solid rgba(0, 0, 0, 0.3);
	border-radius: 50%;
	width: 24px;
	height: 24px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
`;

const ProfileHeadline = styled.p`
	font-size: 16px;
	color: rgba(0, 0, 0, 0.9);
	margin: 4px 0;
`;

const ProfileLocation = styled.p`
	font-size: 14px;
	color: rgba(0, 0, 0, 0.6);
	margin: 4px 0;
`;

const MutualConnectionsText = styled.p`
	font-size: 12px;
	color: rgba(0, 0, 0, 0.6);
	margin: 4px 0 0;
`;

const ConnectionsLink = styled.a`
	font-size: 14px;
	color: #0a66c2;
	font-weight: 600;
	cursor: pointer;
	text-decoration: none;
	&:hover {
		text-decoration: underline;
	}
`;

const ActionButtons = styled.div`
	display: flex;
	gap: 8px;
	margin-top: 16px;
	flex-wrap: wrap;
`;

const PrimaryButton = styled.button`
	background: #0a66c2;
	color: #fff;
	border: none;
	border-radius: 20px;
	padding: 6px 16px;
	font-size: 16px;
	font-weight: 600;
	cursor: pointer;
	&:hover {
		background: #004182;
	}
`;

const OutlinedButton = styled.button`
	background: transparent;
	color: rgba(0, 0, 0, 0.6);
	border: 1px solid rgba(0, 0, 0, 0.6);
	border-radius: 20px;
	padding: 6px 16px;
	font-size: 16px;
	font-weight: 600;
	cursor: pointer;
	&:hover {
		background: rgba(0, 0, 0, 0.08);
		border-color: rgba(0, 0, 0, 0.9);
		color: rgba(0, 0, 0, 0.9);
	}
`;

const OpenToCard = styled(Card)`
	padding: 16px 24px;
	border: 1px solid rgba(0, 0, 0, 0.08);
	display: flex;
	align-items: flex-start;
	gap: 12px;
	@media (max-width: 768px) {
		border-radius: 0;
	}
`;

const OpenToIcon = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background: #eef3f8;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 20px;
	flex-shrink: 0;
`;

const OpenToInfo = styled.div`
	flex: 1;
	h3 {
		font-size: 14px;
		font-weight: 600;
		color: rgba(0, 0, 0, 0.9);
		margin: 0;
	}
	p {
		font-size: 14px;
		color: rgba(0, 0, 0, 0.6);
		margin: 4px 0 0;
	}
	a {
		font-size: 14px;
		color: #0a66c2;
		font-weight: 600;
		text-decoration: none;
		cursor: pointer;
		&:hover {
			text-decoration: underline;
		}
	}
`;

const MutualHighlightsCard = styled(Card)`
	padding: 24px;
	@media (max-width: 768px) {
		border-radius: 0;
	}
`;

const MutualHighlightsTitle = styled.h2`
	font-size: 20px;
	font-weight: 600;
	color: rgba(0, 0, 0, 0.9);
	margin: 0 0 16px;
`;

const MutualHighlightsGrid = styled.div`
	display: flex;
	gap: 16px;
	@media (max-width: 768px) {
		flex-direction: column;
	}
`;

const MutualHighlightItem = styled.div`
	flex: 1;
	padding: 16px;
	border: 1px solid rgba(0, 0, 0, 0.08);
	border-radius: 8px;
	display: flex;
	align-items: flex-start;
	gap: 12px;
`;

const MutualHighlightIcon = styled.div`
	width: 48px;
	height: 48px;
	border-radius: 4px;
	background: ${(props) => props.$color || "#eef3f8"};
	flex-shrink: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 24px;
`;

const MutualHighlightInfo = styled.div`
	flex: 1;
	h4 {
		font-size: 14px;
		font-weight: 600;
		color: rgba(0, 0, 0, 0.9);
		margin: 0 0 4px;
	}
	p {
		font-size: 12px;
		color: rgba(0, 0, 0, 0.6);
		margin: 0 0 8px;
	}
	a {
		font-size: 14px;
		color: #0a66c2;
		font-weight: 600;
		text-decoration: none;
		cursor: pointer;
		&:hover {
			text-decoration: underline;
		}
	}
`;

const HighlightsCard = styled(Card)`
	padding: 16px 24px;
	display: flex;
	gap: 16px;
	@media (max-width: 768px) {
		flex-direction: column;
		border-radius: 0;
	}
`;

const HighlightBox = styled.div`
	flex: 1;
	padding: 12px;
	border: 1px solid rgba(0, 0, 0, 0.08);
	border-radius: 8px;
	h4 {
		font-size: 14px;
		color: rgba(0, 0, 0, 0.6);
		font-weight: 400;
		margin: 0;
	}
	p {
		font-size: 20px;
		font-weight: 600;
		color: rgba(0, 0, 0, 0.9);
		margin: 4px 0 0;
	}
`;

const SectionCard = styled(Card)`
	padding: 24px;
	@media (max-width: 768px) {
		border-radius: 0;
	}
`;

const SectionTitle = styled.h2`
	font-size: 20px;
	font-weight: 600;
	color: rgba(0, 0, 0, 0.9);
	margin: 0 0 16px;
`;

const AboutText = styled.p`
	font-size: 14px;
	line-height: 1.6;
	color: rgba(0, 0, 0, 0.9);
	margin: 0;
`;

const FollowerCount = styled.p`
	font-size: 14px;
	color: rgba(0, 0, 0, 0.6);
	margin: 0 0 12px;
`;

const ExperienceItem = styled.div`
	display: flex;
	gap: 12px;
	padding: 12px 0;
	border-top: 1px solid rgba(0, 0, 0, 0.08);
	&:first-of-type {
		border-top: none;
	}
`;

const LogoSquare = styled.div`
	width: 48px;
	height: 48px;
	border-radius: 4px;
	background: ${(props) => props.$color || "#0a66c2"};
	flex-shrink: 0;
`;

const ExperienceDetails = styled.div`
	flex: 1;
`;

const ExperienceTitle = styled.h3`
	font-size: 14px;
	font-weight: 600;
	color: rgba(0, 0, 0, 0.9);
	margin: 0;
`;

const ExperienceCompany = styled.p`
	font-size: 14px;
	color: rgba(0, 0, 0, 0.9);
	margin: 2px 0 0;
`;

const ExperienceDuration = styled.p`
	font-size: 12px;
	color: rgba(0, 0, 0, 0.6);
	margin: 2px 0 0;
`;

const ExperienceDescription = styled.p`
	font-size: 14px;
	color: rgba(0, 0, 0, 0.9);
	margin: 8px 0 0;
	line-height: 1.4;
`;

const SkillsList = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
`;

const SkillPill = styled.span`
	background: #eef3f8;
	color: rgba(0, 0, 0, 0.9);
	padding: 6px 16px;
	border-radius: 16px;
	font-size: 14px;
	font-weight: 600;
`;

const SidebarCard = styled(Card)`
	padding: 16px;
`;

const SidebarTitle = styled.h3`
	font-size: 16px;
	font-weight: 600;
	color: rgba(0, 0, 0, 0.9);
	margin: 0 0 12px;
`;

const SuggestionItem = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 8px 0;
	border-top: 1px solid rgba(0, 0, 0, 0.08);
	&:first-of-type {
		border-top: none;
	}
`;

const SuggestionAvatar = styled.img`
	width: 48px;
	height: 48px;
	border-radius: 50%;
`;

const SuggestionInfo = styled.div`
	flex: 1;
	min-width: 0;
	h4 {
		font-size: 14px;
		font-weight: 600;
		color: rgba(0, 0, 0, 0.9);
		margin: 0;
	}
	p {
		font-size: 12px;
		color: rgba(0, 0, 0, 0.6);
		margin: 2px 0 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
`;

const ConnectSmallButton = styled.button`
	background: transparent;
	color: rgba(0, 0, 0, 0.6);
	border: 1px solid rgba(0, 0, 0, 0.6);
	border-radius: 16px;
	padding: 4px 12px;
	font-size: 12px;
	font-weight: 600;
	cursor: pointer;
	flex-shrink: 0;
	&:hover {
		background: rgba(0, 0, 0, 0.08);
		border-color: rgba(0, 0, 0, 0.9);
	}
`;

function ProfilePage(props) {
	const { id } = useParams();

	let displayName = "Brenda Synergise";
	let headline = "Chief Vibes Officer at Disrupton Industries";
	let photoURL = "/images/user.svg";

	if (props.ids && props.profiles) {
		const profileIndex = props.ids.indexOf(id);
		if (profileIndex !== -1) {
			const p = props.profiles[profileIndex];
			displayName = p.displayName || displayName;
			headline = p.headline || headline;
			photoURL = p.photoURL || photoURL;
		}
	}

	return (
		<Container>
			<MainColumn>
				<Card>
					<Banner />
					<ProfileHeader>
						<ProfilePhoto src={photoURL} alt={displayName} />
						<ProfileName>{displayName} <ConnectionDegree>2</ConnectionDegree></ProfileName>
						<ProfileHeadline>{headline}</ProfileHeadline>
						<ProfileLocation>Greater Sydney Area &middot; Contact info</ProfileLocation>
						<ConnectionsLink href="#">720 connections</ConnectionsLink>
						<MutualConnectionsText>Chad Bandwidth and Gary Touchbase are mutual connections</MutualConnectionsText>
						<ActionButtons>
							<PrimaryButton>Connect</PrimaryButton>
							<OutlinedButton>Message</OutlinedButton>
							<OutlinedButton>More</OutlinedButton>
						</ActionButtons>
					</ProfileHeader>
				</Card>

				<OpenToCard>
					<OpenToIcon>&#128188;</OpenToIcon>
					<OpenToInfo>
						<h3>Open to work</h3>
						<p>Chief Vibes Officer, Synergy Architect, and Thought Leader roles</p>
						<a href="#">See all details</a>
					</OpenToInfo>
				</OpenToCard>

				<MutualHighlightsCard>
					<MutualHighlightsTitle>Highlights</MutualHighlightsTitle>
					<MutualHighlightsGrid>
						<MutualHighlightItem>
							<MutualHighlightIcon $color="#7c3aed">&#127891;</MutualHighlightIcon>
							<MutualHighlightInfo>
								<h4>University of Hustle Culture</h4>
								<p>You both studied at University of Hustle Culture</p>
								<a href="#">Message</a>
							</MutualHighlightInfo>
						</MutualHighlightItem>
						<MutualHighlightItem>
							<MutualHighlightIcon $color="#0a66c2">&#127970;</MutualHighlightIcon>
							<MutualHighlightInfo>
								<h4>You both worked at SynergiCo</h4>
								<p>Brenda started at SynergiCo before you joined</p>
								<a href="#">Message</a>
							</MutualHighlightInfo>
						</MutualHighlightItem>
					</MutualHighlightsGrid>
				</MutualHighlightsCard>

				<HighlightsCard>
					<HighlightBox>
						<h4>Profile viewers</h4>
						<p>36</p>
					</HighlightBox>
					<HighlightBox>
						<h4>Post impressions</h4>
						<p>847</p>
					</HighlightBox>
					<HighlightBox>
						<h4>Search appearances</h4>
						<p>12</p>
					</HighlightBox>
				</HighlightsCard>

				<SectionCard>
					<SectionTitle>About</SectionTitle>
					<AboutText>{profileData.about}</AboutText>
				</SectionCard>

				<SectionCard>
					<SectionTitle>Activity</SectionTitle>
					<FollowerCount>720 followers</FollowerCount>
					<AboutText>No recent activity to show. Probably too busy synergising.</AboutText>
				</SectionCard>

				<SectionCard>
					<SectionTitle>Experience</SectionTitle>
					{profileData.experience.map((exp, index) => (
						<ExperienceItem key={index}>
							<LogoSquare $color={exp.logoColor} />
							<ExperienceDetails>
								<ExperienceTitle>{exp.title}</ExperienceTitle>
								<ExperienceCompany>{exp.company}</ExperienceCompany>
								<ExperienceDuration>{exp.duration}</ExperienceDuration>
								<ExperienceDescription>{exp.description}</ExperienceDescription>
							</ExperienceDetails>
						</ExperienceItem>
					))}
				</SectionCard>

				<SectionCard>
					<SectionTitle>Education</SectionTitle>
					{profileData.education.map((edu, index) => (
						<ExperienceItem key={index}>
							<LogoSquare $color={edu.logoColor} />
							<ExperienceDetails>
								<ExperienceTitle>{edu.school}</ExperienceTitle>
								<ExperienceCompany>{edu.degree}</ExperienceCompany>
								<ExperienceDuration>{edu.years}</ExperienceDuration>
							</ExperienceDetails>
						</ExperienceItem>
					))}
				</SectionCard>

				<SectionCard>
					<SectionTitle>Skills</SectionTitle>
					<SkillsList>
						{profileData.skills.map((skill, index) => (
							<SkillPill key={index}>{skill}</SkillPill>
						))}
					</SkillsList>
				</SectionCard>
			</MainColumn>

			<Sidebar>
				<SidebarCard>
					<SidebarTitle>More profiles for you</SidebarTitle>
					{networkSuggestions.slice(0, 3).map((person, index) => (
						<SuggestionItem key={index}>
							<SuggestionAvatar src={person.photoUrl} alt={person.name} />
							<SuggestionInfo>
								<h4>{person.name}</h4>
								<p>{person.headline}</p>
							</SuggestionInfo>
							<ConnectSmallButton>Connect</ConnectSmallButton>
						</SuggestionItem>
					))}
				</SidebarCard>
			</Sidebar>
		</Container>
	);
}

const mapStateToProps = (state) => {
	return {
		profiles: state.profileState.profiles,
		ids: state.profileState.ids,
	};
};

export default connect(mapStateToProps)(ProfilePage);
