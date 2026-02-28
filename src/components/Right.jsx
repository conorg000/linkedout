import React, { useState } from "react";
import styled from "styled-components";
import { newsHeadlines } from "../data/satiricalContent";

const Container = styled.div`
	grid-area: right;
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
	text-align: left;
	overflow: hidden;
	margin-bottom: 8px;
	background-color: #fff;
	border-radius: 8px;
	border: none;
	position: relative;
	box-shadow: 0 0 0 1px rgb(0 0 0 / 15%);
	padding: 12px;
`;

const NewsHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 4px;
	h2 {
		font-size: 16px;
		font-weight: 600;
		color: rgba(0, 0, 0, 0.9);
	}
	h3 {
		font-size: 12px;
		font-weight: 400;
		color: rgba(0, 0, 0, 0.6);
		margin-top: 2px;
	}
	img {
		cursor: pointer;
	}
`;

const NewsItem = styled.div`
	padding: 6px 0;
	cursor: pointer;
	&:hover {
		h3 {
			color: #0a66c2;
			text-decoration: underline;
		}
	}
	h3 {
		font-size: 14px;
		font-weight: 600;
		color: rgba(0, 0, 0, 0.9);
		line-height: 1.4;
		margin-bottom: 2px;
		&::before {
			content: "\\2022";
			color: rgba(0, 0, 0, 0.6);
			margin-right: 8px;
			font-size: 12px;
		}
	}
	p {
		font-size: 12px;
		color: rgba(0, 0, 0, 0.6);
		padding-left: 16px;
	}
`;

const ShowMore = styled.button`
	display: block;
	width: 100%;
	padding: 8px 0 4px;
	font-size: 14px;
	font-weight: 600;
	color: rgba(0, 0, 0, 0.6);
	background: none;
	border: none;
	text-align: left;
	cursor: pointer;
	&:hover {
		color: #0a66c2;
	}
`;

const PromotedCard = styled(Card)`
	text-align: center;
	img {
		width: 100%;
		height: 100%;
	}
`;

const PromotedLabel = styled.div`
	font-size: 11px;
	color: rgba(0, 0, 0, 0.6);
	text-align: right;
	margin-bottom: 4px;
`;

const FooterLinks = styled.div`
	padding: 16px 12px;
	text-align: center;
	a {
		font-size: 11px;
		color: rgba(0, 0, 0, 0.6);
		text-decoration: none;
		margin: 0 4px;
		&:hover {
			color: #0a66c2;
			text-decoration: underline;
		}
	}
	span {
		font-size: 11px;
		color: rgba(0, 0, 0, 0.6);
		margin: 0 2px;
	}
`;

const Copyright = styled.div`
	font-size: 11px;
	color: rgba(0, 0, 0, 0.6);
	margin-top: 8px;
	text-align: center;
`;

function Right() {
	const [showAll, setShowAll] = useState(false);
	const visibleHeadlines = showAll ? newsHeadlines : newsHeadlines.slice(0, 5);

	return (
		<Container>
			<Card>
				<NewsHeader>
					<div>
						<h2>LinkedOut News</h2>
						<h3>Top stories</h3>
					</div>
					<img src="/images/feed-icon.svg" alt="" />
				</NewsHeader>
				{visibleHeadlines.map((item, index) => (
					<NewsItem key={index}>
						<h3>{item.headline}</h3>
						<p>{item.timeAgo} &middot; {item.readers}</p>
					</NewsItem>
				))}
				{!showAll && (
					<ShowMore onClick={() => setShowAll(true)}>
						Show more &#9660;
					</ShowMore>
				)}
			</Card>
			<PromotedCard>
				<PromotedLabel>Promoted</PromotedLabel>
				<img src="/images/EEAE53ED-2B43-4DF7-BAD0-0F81EE7629DE_4_5005_c.jpeg" alt="" />
			</PromotedCard>
			<FooterLinks>
				<a href="#">About</a><span>&middot;</span>
				<a href="#">Accessibility</a><span>&middot;</span>
				<a href="#">Help Center</a><span>&middot;</span>
				<a href="#">Privacy & Terms</a><span>&middot;</span>
				<a href="#">Ad Choices</a><span>&middot;</span>
				<a href="#">Advertising</a><span>&middot;</span>
				<a href="#">Business Services</a>
				<Copyright>LinkedOut Corporation &copy; 2026</Copyright>
			</FooterLinks>
		</Container>
	);
}

export default Right;
