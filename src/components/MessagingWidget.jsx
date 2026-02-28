import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const WidgetContainer = styled.div`
	position: fixed;
	bottom: 0;
	right: 24px;
	z-index: 9;
	width: 300px;
	background: #fff;
	border-radius: 8px 8px 0 0;
	box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 -2px 8px rgb(0 0 0 / 10%);
	@media (max-width: 768px) {
		display: none;
	}
`;

const TitleBar = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 8px 12px;
	cursor: pointer;
	&:hover {
		background: rgba(0, 0, 0, 0.04);
	}
`;

const TitleText = styled.span`
	font-size: 14px;
	font-weight: 600;
	color: rgba(0, 0, 0, 0.9);
`;

const TitleIcons = styled.div`
	display: flex;
	gap: 4px;
`;

const IconBtn = styled.button`
	background: none;
	border: none;
	cursor: pointer;
	width: 28px;
	height: 28px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: rgba(0, 0, 0, 0.6);
	font-size: 16px;
	&:hover {
		background: rgba(0, 0, 0, 0.08);
	}
`;

function MessagingWidget() {
	const location = useLocation();
	const [collapsed] = useState(true);

	if (location.pathname === "/messaging") {
		return null;
	}

	return (
		<WidgetContainer>
			<TitleBar>
				<TitleText>Messaging</TitleText>
				<TitleIcons>
					<IconBtn title="Compose">&#9998;</IconBtn>
					<IconBtn title={collapsed ? "Expand" : "Collapse"}>
						{collapsed ? "\u25B4" : "\u25BE"}
					</IconBtn>
				</TitleIcons>
			</TitleBar>
		</WidgetContainer>
	);
}

export default MessagingWidget;
