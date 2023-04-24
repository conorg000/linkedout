import { useState } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import Firebase from "firebase";
import styled from "styled-components";
import { createProfileAPI, updateArticleAPI } from "../action";

const Container = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 11;
	background-color: rgba(0, 0, 0, 0.8);
	animation: fadeIn 0.3s ease;
`;

const Content = styled.div`
	width: 100%;
	max-width: 552px;
	max-height: 90%;
	background-color: #fff;
	overflow: initial;
	border-radius: 5px;
	position: relative;
	display: flex;
	flex-direction: column;
	top: 32px;
	margin: 0 auto;
`;

const Header = styled.div`
	display: block;
	padding: 10px 20px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.15);
	font-size: 20px;
	line-height: 1.5;
	color: rgba(0, 0, 0, 0.9);
	display: flex;
	justify-content: space-between;
	align-items: center;
	h2 {
		font-weight: 400;
	}
	button {
		width: 40px;
		height: 40px;
		min-width: auto;
		border: none;
		outline: none;
		background: transparent;
		img,
		svg {
			pointer-events: none;
		}
	}
`;

const SharedContent = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	overflow-y: auto;
	vertical-align: baseline;
	background: transparent;
	padding: 5px 12px;
`;

const UserInfo = styled.div`
	display: flex;
	align-items: center;
	padding: 10px 24px;
	img {
		width: 48px;
		height: 48px;
		background-clip: content-box;
		border-radius: 50%;
		border: 2px solid transparent;
	}
	span {
		font-weight: 600;
		font-size: 16px;
		line-height: 1.5;
		margin-left: 5px;
	}
`;

const ShareCreation = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 10px 24px 10px 16px;
`;

const AttachAsset = styled.div`
	display: flex;
	align-items: center;
`;

const AssetButton = styled.button`
	display: flex;
	align-items: center;
	height: 40px;
	min-width: auto;
	margin-right: 8px;
	border-radius: 50%;
	border: none;
	outline: none;
	justify-content: center;
	background: transparent;
	&:hover {
		background: rgba(0, 0, 0, 0.08);
	}
`;

const ShareComment = styled.div`
	padding-left: 8px;
	margin-right: auto;
	border-left: 1px solid rgba(0, 0, 0, 0.08);
	${AssetButton} {
		border-radius: 50px;
		padding: 5px 10px;
		span {
			font-size: 16px;
			font-weight: 600;
			color: rgba(0, 0, 0, 0.6);
			padding: 0 5px;
		}
	}
`;

const PostButton = styled.button`
	min-width: 60px;
	padding: 0 16px;
	border-radius: 20px;
	background: ${(props) => (props.disabled ? "#b8b8b8" : "#0a66c2")};
	color: ${(props) => (props.disabled ? "#5a5a5a" : "#fff")};
	font-size: 16px;
	letter-spacing: 1.1px;
	border: none;
	outline: none;
	&:hover {
		background: ${(props) => (props.disabled ? "#b8b8b8" : "#004182")};
	}
`;

const Editor = styled.div`
	padding: 12px 24px;
	textarea {
		width: 100%;
		min-height: 100px;
		resize: none;
	}
	input {
		width: 100%;
		height: 35px;
		font-size: 16px;
		margin-bottom: 20px;
	}
`;

const UploadImage = styled.div`
	text-align: center;
	img {
		width: 100%;
	}
`;

function LikeModal(props) {
	const [editorText, setEditorText] = useState("");
	const reset = (event) => {
		setEditorText("");
		props.clickHandler(event);
	};


	function updateLike(event) {
		event.preventDefault();

        if(isNaN(editorText) || isNaN(parseFloat(editorText))){
            console.log('help')
            return;
        }

		// Get current article
		let currentLikeObject = props.article.likes;
        console.log("current like obj: ")
        console.log(currentLikeObject);

        console.log(editorText);
        let newLikeCount = editorText;

		// Make new article object
		let newLikedObject = {
            count: newLikeCount,
            whoLiked: currentLikeObject.whoLiked
		};

        console.log(newLikedObject);

		// Make payload
		const payload = {
			update: {
				likes: newLikedObject
			},
			id: props.articleId
		};

		props.updateLike(payload);
		reset(event);
	}

	return (
		<>
			{props.showModal === "open" && (
				<Container>
					<Content>
						<Header>
							<h2>Update likes</h2>
							<button onClick={(event) => reset(event)}>
								<img src="/images/close-icon.svg" alt="" />
							</button>
						</Header>
						<SharedContent>
							<Editor>
								<textarea value={editorText} onChange={(event) => setEditorText(event.target.value)} placeholder={props.article.likes.count} autoFocus={true} />
							</Editor>
						</SharedContent>
						<ShareCreation>
							<PostButton disabled={!editorText ? true : false} onClick={(event) => updateLike(event)}>
								Update like
							</PostButton>
						</ShareCreation>
					</Content>
				</Container>
			)}
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.userState.user,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateLike: (payload) => dispatch(updateArticleAPI(payload)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeModal);
