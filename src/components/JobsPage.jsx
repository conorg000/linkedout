import React, { useState } from "react";
import styled from "styled-components";
import { jobListings, jobCollections } from "../data/satiricalContent";

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

const SidebarAvatar = styled.img`
	width: 72px;
	height: 72px;
	border-radius: 50%;
	margin: 0 auto 8px;
	display: block;
	object-fit: cover;
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
	margin: 0 0 16px;
	line-height: 1.4;
`;

const SidebarLink = styled.a`
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 10px 0;
	color: rgba(0, 0, 0, 0.6);
	font-size: 14px;
	font-weight: 600;
	text-decoration: none;
	cursor: pointer;
	border-bottom: 1px solid rgba(0, 0, 0, 0.08);

	&:hover {
		text-decoration: underline;
		color: #0a66c2;
	}

	&:last-of-type {
		border-bottom: none;
	}
`;

const LinkIcon = styled.span`
	font-size: 16px;
	width: 20px;
	text-align: center;
	flex-shrink: 0;
	color: rgba(0, 0, 0, 0.6);
`;

const FooterLinks = styled.div`
	margin-top: 16px;
	color: rgba(0, 0, 0, 0.6);
	font-size: 12px;
	line-height: 1.8;

	a {
		color: rgba(0, 0, 0, 0.6);
		text-decoration: none;
		cursor: pointer;
		&:hover {
			text-decoration: underline;
			color: #0a66c2;
		}
	}
`;

const Main = styled.main``;

const SectionTitle = styled.h2`
	font-size: 18px;
	font-weight: 600;
	color: rgba(0, 0, 0, 0.9);
	margin: 0 0 4px;
`;

const SectionSubtitle = styled.p`
	font-size: 14px;
	color: rgba(0, 0, 0, 0.6);
	margin: 0 0 16px;
`;

const JobListCard = styled(Card)`
	margin-bottom: 16px;
`;

const JobItem = styled.div`
	display: flex;
	padding: 16px;
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

const JobLogo = styled.div`
	width: 48px;
	height: 48px;
	border-radius: 4px;
	background: ${(props) => props.color || "#0a66c2"};
	flex-shrink: 0;
`;

const JobInfo = styled.div`
	flex: 1;
`;

const JobTitle = styled.h3`
	font-size: 14px;
	font-weight: 600;
	color: #0a66c2;
	margin: 0 0 4px;
	cursor: pointer;

	&:hover {
		text-decoration: underline;
	}
`;

const JobCompany = styled.p`
	font-size: 14px;
	color: rgba(0, 0, 0, 0.9);
	margin: 0 0 2px;
`;

const JobLocation = styled.p`
	font-size: 12px;
	color: rgba(0, 0, 0, 0.6);
	margin: 0 0 4px;
`;

const JobTime = styled.p`
	font-size: 12px;
	color: rgba(0, 0, 0, 0.6);
	margin: 0 0 8px;
`;

const TagsRow = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 6px;
`;

const Tag = styled.span`
	font-size: 11px;
	color: rgba(0, 0, 0, 0.6);
	background: rgba(0, 0, 0, 0.06);
	border-radius: 12px;
	padding: 2px 8px;
`;

const BadgeRow = styled.div`
	display: flex;
	gap: 8px;
	align-items: center;
	margin-top: 4px;
`;

const PromotedTag = styled.span`
	font-size: 12px;
	color: rgba(0, 0, 0, 0.6);
	margin-top: 4px;
`;

const EasyApplyTag = styled.span`
	font-size: 12px;
	color: rgba(0, 0, 0, 0.6);
	display: flex;
	align-items: center;
	gap: 4px;

	&::before {
		content: "";
		display: inline-block;
		width: 14px;
		height: 14px;
		background: #0a66c2;
		border-radius: 2px;
	}
`;

const ActivelyReviewing = styled.p`
	font-size: 12px;
	color: rgba(0, 0, 0, 0.6);
	margin: 4px 0 0;
	&::before {
		content: "\\1F7E2";
		margin-right: 4px;
		font-size: 8px;
	}
`;

const DismissJobButton = styled.button`
	background: none;
	border: none;
	cursor: pointer;
	color: rgba(0, 0, 0, 0.6);
	font-size: 20px;
	padding: 4px;
	flex-shrink: 0;
	line-height: 1;
	border-radius: 50%;
	align-self: flex-start;
	&:hover {
		background: rgba(0, 0, 0, 0.08);
	}
`;

const ShowAllButton = styled.button`
	display: block;
	width: 100%;
	text-align: center;
	padding: 12px;
	background: none;
	border: none;
	border-top: 1px solid rgba(0, 0, 0, 0.08);
	color: rgba(0, 0, 0, 0.6);
	font-size: 14px;
	font-weight: 600;
	cursor: pointer;

	&:hover {
		background: rgba(0, 0, 0, 0.04);
		color: rgba(0, 0, 0, 0.9);
	}
`;

const CollectionsSection = styled.div`
	margin-top: 24px;
`;

const CollectionsTitle = styled.h2`
	font-size: 16px;
	font-weight: 600;
	color: rgba(0, 0, 0, 0.9);
	margin: 0 0 12px;
`;

const ChipsRow = styled.div`
	display: flex;
	gap: 8px;
	overflow-x: auto;
	padding-bottom: 8px;

	&::-webkit-scrollbar {
		height: 4px;
	}
	&::-webkit-scrollbar-thumb {
		background: rgba(0, 0, 0, 0.15);
		border-radius: 2px;
	}
`;

const Chip = styled.button`
	white-space: nowrap;
	padding: 8px 16px;
	border-radius: 16px;
	border: 1px solid rgba(0, 0, 0, 0.3);
	background: #fff;
	color: rgba(0, 0, 0, 0.6);
	font-size: 14px;
	font-weight: 600;
	cursor: pointer;

	&:hover {
		background: rgba(0, 0, 0, 0.04);
		border-color: rgba(0, 0, 0, 0.6);
		color: rgba(0, 0, 0, 0.9);
	}
`;

function JobsPage() {
	const [showAll, setShowAll] = useState(false);
	const visibleJobs = showAll ? jobListings : jobListings.slice(0, 4);

	return (
		<Container>
			<Sidebar>
				<SidebarCard>
					<SidebarAvatar src="/images/user.svg" alt="" />
					<ProfileName>Harold</ProfileName>
					<ProfileHeadline>Disrupting the disruption industry</ProfileHeadline>
					<SidebarLink><LinkIcon>&#9881;</LinkIcon> Preferences</SidebarLink>
					<SidebarLink><LinkIcon>&#9776;</LinkIcon> Job tracker</SidebarLink>
					<SidebarLink><LinkIcon>&#9733;</LinkIcon> My Career Insights</SidebarLink>
					<SidebarLink><LinkIcon>&#9998;</LinkIcon> Post a free job</SidebarLink>
					<FooterLinks>
						<a>About</a> &middot; <a>Accessibility</a> &middot; <a>Help Center</a>
						<br />
						<a>Privacy & Terms</a> &middot; <a>Ad Choices</a>
						<br />
						<a>Advertising</a> &middot; <a>Business Services</a>
						<br />
						<br />
						LinkedOut Corporation &copy; 2026
					</FooterLinks>
				</SidebarCard>
			</Sidebar>
			<Main>
				<SectionTitle>Top job picks for you</SectionTitle>
				<SectionSubtitle>Based on your profile, preferences, and activity like applies, searches, and saves</SectionSubtitle>
				<JobListCard>
					{visibleJobs.map((job, idx) => (
						<JobItem key={idx}>
							<JobLogo color={job.logoColor} />
							<JobInfo>
								<JobTitle>{job.title}</JobTitle>
								<JobCompany>{job.company}</JobCompany>
								<JobLocation>{job.location}</JobLocation>
								<JobTime>{job.timePosted}</JobTime>
								{idx < 2 && <ActivelyReviewing>Actively reviewing applicants</ActivelyReviewing>}
								<TagsRow>
									{job.tags.map((tag, tIdx) => (
										<Tag key={tIdx}>{tag}</Tag>
									))}
								</TagsRow>
								{(idx === 0 || idx === 1 || idx === 3) && (
									<BadgeRow>
										{(idx === 0 || idx === 3) && <PromotedTag>Promoted</PromotedTag>}
										<EasyApplyTag>Easy Apply</EasyApplyTag>
									</BadgeRow>
								)}
							</JobInfo>
							<DismissJobButton title="Dismiss">&times;</DismissJobButton>
						</JobItem>
					))}
					{!showAll && jobListings.length > 4 && (
						<ShowAllButton onClick={() => setShowAll(true)}>
							Show all &rarr;
						</ShowAllButton>
					)}
				</JobListCard>
				<CollectionsSection>
					<CollectionsTitle>Explore with job collections</CollectionsTitle>
					<ChipsRow>
						{jobCollections.map((col, idx) => (
							<Chip key={idx}>{col}</Chip>
						))}
					</ChipsRow>
				</CollectionsSection>
			</Main>
		</Container>
	);
}

export default JobsPage;
