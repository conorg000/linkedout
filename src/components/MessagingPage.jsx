import React, { useState } from "react";
import styled from "styled-components";
import { messages, conversationMessages } from "../data/satiricalContent";

const Container = styled.div`
	max-width: 1128px;
	margin: 0 auto;
	padding: 24px 16px;
	@media (max-width: 768px) {
		padding: 8px 0;
		padding-bottom: 72px;
	}
`;

const MessagingCard = styled.div`
	background: #fff;
	border-radius: 8px;
	box-shadow: 0 0 0 1px rgb(0 0 0 / 15%);
	display: flex;
	min-height: 70vh;
	overflow: hidden;
`;

const LeftPanel = styled.div`
	width: 35%;
	border-right: 1px solid rgba(0, 0, 0, 0.08);
	display: flex;
	flex-direction: column;
	@media (max-width: 768px) {
		width: 100%;
		border-right: none;
	}
`;

const LeftHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 16px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.08);
	h2 {
		font-size: 16px;
		font-weight: 600;
		color: rgba(0, 0, 0, 0.9);
	}
`;

const HeaderIcons = styled.div`
	display: flex;
	gap: 8px;
`;

const IconButton = styled.button`
	background: none;
	border: none;
	cursor: pointer;
	width: 32px;
	height: 32px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: rgba(0, 0, 0, 0.6);
	font-size: 18px;
	&:hover {
		background: rgba(0, 0, 0, 0.08);
	}
`;

const SearchBar = styled.div`
	padding: 8px 16px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.08);
	input {
		width: 100%;
		border: none;
		background: #eef3f8;
		border-radius: 4px;
		padding: 8px 12px;
		font-size: 14px;
		outline: none;
		box-sizing: border-box;
		&::placeholder {
			color: rgba(0, 0, 0, 0.6);
		}
	}
`;

const FilterChips = styled.div`
	display: flex;
	gap: 8px;
	padding: 8px 16px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.08);
	overflow-x: auto;
`;

const FilterChip = styled.button`
	white-space: nowrap;
	padding: 4px 12px;
	border-radius: 16px;
	font-size: 12px;
	font-weight: 600;
	cursor: pointer;
	background: ${(props) => (props.$active ? "#057642" : "transparent")};
	color: ${(props) => (props.$active ? "#fff" : "rgba(0, 0, 0, 0.6)")};
	border: ${(props) => (props.$active ? "none" : "1px solid rgba(0, 0, 0, 0.3)")};
	&:hover {
		background: ${(props) => (props.$active ? "#046236" : "rgba(0, 0, 0, 0.08)")};
	}
`;

const ConversationList = styled.div`
	flex: 1;
	overflow-y: auto;
`;

const ConversationItem = styled.div`
	display: flex;
	align-items: center;
	padding: 12px 16px;
	cursor: pointer;
	background: ${(props) => (props.$selected ? "#d0e8ff" : "transparent")};
	&:hover {
		background: ${(props) => (props.$selected ? "#d0e8ff" : "rgba(0, 0, 0, 0.04)")};
	}
`;

const Avatar = styled.img`
	width: 48px;
	height: 48px;
	border-radius: 50%;
	margin-right: 12px;
	flex-shrink: 0;
`;

const ConversationInfo = styled.div`
	flex: 1;
	min-width: 0;
`;

const ConversationTop = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const ConversationName = styled.span`
	font-size: 14px;
	font-weight: ${(props) => (props.$unread ? "600" : "400")};
	color: rgba(0, 0, 0, 0.9);
`;

const ConversationTime = styled.span`
	font-size: 12px;
	color: rgba(0, 0, 0, 0.6);
	flex-shrink: 0;
	margin-left: 8px;
`;

const ConversationPreview = styled.p`
	font-size: 12px;
	color: rgba(0, 0, 0, 0.6);
	font-weight: ${(props) => (props.$unread ? "600" : "400")};
	margin: 2px 0 0;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const UnreadDot = styled.span`
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background: #0a66c2;
	flex-shrink: 0;
	margin-left: 8px;
`;

const RightPanel = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	@media (max-width: 768px) {
		display: none;
	}
`;

const RightHeader = styled.div`
	display: flex;
	align-items: center;
	padding: 12px 16px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.08);
	h3 {
		font-size: 16px;
		font-weight: 600;
		color: rgba(0, 0, 0, 0.9);
		margin: 0;
	}
	p {
		font-size: 12px;
		color: rgba(0, 0, 0, 0.6);
		margin: 2px 0 0;
	}
`;

const MessagesArea = styled.div`
	flex: 1;
	overflow-y: auto;
	padding: 16px;
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

const MessageBubble = styled.div`
	max-width: 65%;
	align-self: ${(props) => (props.$isMe ? "flex-end" : "flex-start")};
`;

const BubbleSender = styled.span`
	font-size: 11px;
	color: rgba(0, 0, 0, 0.6);
	margin-bottom: 2px;
	display: block;
`;

const BubbleText = styled.div`
	padding: 10px 14px;
	border-radius: 12px;
	font-size: 14px;
	line-height: 1.4;
	background: ${(props) => (props.$isMe ? "#0a66c2" : "#f2f2f2")};
	color: ${(props) => (props.$isMe ? "#fff" : "rgba(0, 0, 0, 0.9)")};
	border-top-right-radius: ${(props) => (props.$isMe ? "4px" : "12px")};
	border-top-left-radius: ${(props) => (props.$isMe ? "12px" : "4px")};
`;

const BubbleTime = styled.span`
	font-size: 11px;
	color: rgba(0, 0, 0, 0.4);
	margin-top: 2px;
	display: block;
	text-align: ${(props) => (props.$isMe ? "right" : "left")};
`;

const InputBar = styled.div`
	display: flex;
	align-items: center;
	padding: 12px 16px;
	border-top: 1px solid rgba(0, 0, 0, 0.08);
	gap: 8px;
	input {
		flex: 1;
		border: 1px solid rgba(0, 0, 0, 0.15);
		border-radius: 20px;
		padding: 8px 16px;
		font-size: 14px;
		outline: none;
		&:focus {
			border-color: #0a66c2;
		}
		&::placeholder {
			color: rgba(0, 0, 0, 0.6);
		}
	}
`;

const AttachmentButton = styled.button`
	background: none;
	border: none;
	cursor: pointer;
	width: 32px;
	height: 32px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: rgba(0, 0, 0, 0.6);
	font-size: 18px;
	flex-shrink: 0;
	&:hover {
		background: rgba(0, 0, 0, 0.08);
	}
`;

const GifButton = styled.button`
	background: none;
	border: 1px solid rgba(0, 0, 0, 0.3);
	border-radius: 4px;
	cursor: pointer;
	padding: 2px 6px;
	font-size: 11px;
	font-weight: 700;
	color: rgba(0, 0, 0, 0.6);
	line-height: 1;
	flex-shrink: 0;
	&:hover {
		background: rgba(0, 0, 0, 0.08);
	}
`;

const SendButton = styled.button`
	background: #0a66c2;
	color: #fff;
	border: none;
	border-radius: 20px;
	padding: 8px 16px;
	font-size: 14px;
	font-weight: 600;
	cursor: pointer;
	flex-shrink: 0;
	&:hover {
		background: #004182;
	}
`;

const MoreMenuButton = styled.button`
	background: none;
	border: none;
	cursor: pointer;
	width: 32px;
	height: 32px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: rgba(0, 0, 0, 0.6);
	font-size: 18px;
	flex-shrink: 0;
	&:hover {
		background: rgba(0, 0, 0, 0.08);
	}
`;

function MessagingPage() {
	const [selectedIndex, setSelectedIndex] = useState(0);

	return (
		<Container>
			<MessagingCard>
				<LeftPanel>
					<LeftHeader>
						<h2>Messaging</h2>
						<HeaderIcons>
							<IconButton title="Compose">&#9998;</IconButton>
							<IconButton title="More">&#8943;</IconButton>
						</HeaderIcons>
					</LeftHeader>
					<SearchBar>
						<input type="text" placeholder="Search messages" />
					</SearchBar>
					<FilterChips>
						<FilterChip $active={true}>Focused &#9662;</FilterChip>
						<FilterChip $active={false}>Jobs</FilterChip>
						<FilterChip $active={false}>Unread</FilterChip>
						<FilterChip $active={false}>Connections</FilterChip>
						<FilterChip $active={false}>InMail</FilterChip>
						<FilterChip $active={false}>Starred</FilterChip>
					</FilterChips>
					<ConversationList>
						{messages.map((msg, index) => (
							<ConversationItem
								key={index}
								$selected={index === selectedIndex}
								onClick={() => setSelectedIndex(index)}
							>
								<Avatar src={msg.photoUrl} alt={msg.name} />
								<ConversationInfo>
									<ConversationTop>
										<ConversationName $unread={msg.unread}>{msg.name}</ConversationName>
										<ConversationTime>{msg.time}</ConversationTime>
									</ConversationTop>
									<ConversationPreview $unread={msg.unread}>{msg.lastMessage}</ConversationPreview>
								</ConversationInfo>
								{msg.unread && <UnreadDot />}
							</ConversationItem>
						))}
					</ConversationList>
				</LeftPanel>
				<RightPanel>
					<RightHeader>
						<div>
							<h3>{messages[selectedIndex]?.name}</h3>
							<p>{messages[selectedIndex]?.headline || "LinkedOut Member"}</p>
						</div>
					</RightHeader>
					<MessagesArea>
						{selectedIndex === 0 &&
							conversationMessages.map((msg, index) => (
								<MessageBubble key={index} $isMe={msg.isMe}>
									<BubbleSender>{msg.sender}</BubbleSender>
									<BubbleText $isMe={msg.isMe}>{msg.text}</BubbleText>
									<BubbleTime $isMe={msg.isMe}>{msg.time}</BubbleTime>
								</MessageBubble>
							))}
						{selectedIndex !== 0 && (
							<MessageBubble $isMe={false}>
								<BubbleSender>{messages[selectedIndex]?.name}</BubbleSender>
								<BubbleText $isMe={false}>{messages[selectedIndex]?.lastMessage}</BubbleText>
								<BubbleTime $isMe={false}>{messages[selectedIndex]?.time}</BubbleTime>
							</MessageBubble>
						)}
					</MessagesArea>
					<InputBar>
						<input type="text" placeholder="Write a message..." />
						<AttachmentButton title="Attach a file">&#128206;</AttachmentButton>
						<GifButton title="Add a GIF">GIF</GifButton>
						<IconButton title="Emoji">&#128578;</IconButton>
						<SendButton>Send</SendButton>
						<MoreMenuButton title="More options">&#8943;</MoreMenuButton>
					</InputBar>
				</RightPanel>
			</MessagingCard>
		</Container>
	);
}

export default MessagingPage;
