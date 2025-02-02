import React, {useState} from "react";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { updateArticleAPI } from "../action";
import CommentModal from "./CommentModal";
import LikedModal from "./LikeModal";
import { useEffect } from "react";

const CommonBox = styled.div`
	text-align: center;
	overflow: hidden;
	margin-bottom: 8px;
	background-color: #fff;
	border-radius: 5px;
	position: relative;
	border: none;
	box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const ArticleStyle = styled(CommonBox)`
	padding: 0;
	padding-bottom: 5px;
	margin: 0 0 8px;
	overflow: visible;
`;

const SharedActor = styled.div`
	padding-right: 40px;
	flex-wrap: nowrap;
	padding: 12px 16px 0;
	margin-bottom: 8px;
	display: flex;
	align-items: center;
	a {
		margin-right: 12px;
		flex-grow: 1;
		overflow: hidden;
		display: flex;
		img {
			width: 48px;
			height: 48px;
			border-radius: 50%;
		}
		& > div {
			display: flex;
			flex-direction: column;
			flex-grow: 1;
			flex-basis: 0;
			margin-left: 8px;
			overflow: hidden;
			span {
				text-align: left;
				&:first-child {
					font-size: 14px;
					font-weight: 700;
					color: #000;
				}
				&:nth-child(n + 2) {
					font-size: 12px;
					color: rgba(0, 0, 0, 0.6);
				}
			}
		}
	}
	button {
		position: absolute;
		top: 0;
		right: 12px;
		border: none;
		outline: none;
		background: transparent;
	}
`;

const Description = styled.div`
	padding: 0 16px;
	overflow: hidden;
	font-size: 14px;
	text-align: left;
	white-space: pre-wrap;
`;

const CommentDescription = styled.div`
	padding: 5px 10px;
	margin: 10px 10px;
	border-radius: 10px;
	overflow: hidden;
	font-size: 14px;
	text-align: left;
	white-space: pre-wrap;
	background-color: rgb(242, 242, 242);
	a {
		margin-right: 12px;
		flex-grow: 1;
		overflow: hidden;
		display: flex;
		img {
			width: 40px;
			height: 40px;
			border-radius: 50%;
		}
		& > div {
			display: flex;
			flex-direction: column;
			flex-grow: 1;
			flex-basis: 0;
			margin-left: 8px;
			overflow: hidden;
			span {
				text-align: left;
				&:first-child {
					font-size: 14px;
					font-weight: 700;
					color: #000;
				}
				&:nth-child(n + 2) {
					font-size: 12px;
					color: rgba(0, 0, 0, 0.6);
				}
				&:nth-child(n + 3) {
					margin-top: 10px;
					font-size: 14px;
					color: black;
				}
			}
		}
	}
`;

const SharedImage = styled.div`
	margin: 8px 16px 0;
	background-color: #f9fafb;
	img {
		width: 100%;
		height: 100%;
	}
`;

const SocialCount = styled.ul`
	line-height: 1.3;
	display: flex;
	align-items: flex-start;
	overflow: auto;
	margin: 0 16px;
	padding: 8px 0;
	border-bottom: 1px solid #e9efdf;
	color: rgba(0, 0, 0, 0.6);
	list-style: none;
	li {
		margin-right: 5px;
		font-size: 12px;
		button {
			display: flex;
			border: none;
			color: rgba(0, 0, 0, 0.6);
			background: transparent;
			span {
				padding-left: 5px;
			}
		}
	}
`;

const LikeAndCommentButtons = styled.button`
    :hover {
        cursor: pointer;
        text-decoration: underline;
    }
`

const SocialActions = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	margin: 4px 12px;
	min-height: 40px;
	padding-bottom: 5px;
	button {
		display: inline-flex;
		align-items: center;
		padding: 8px;
		border: none;
		background: transparent;
		span {
			margin-left: 4px;
			color: rgba(0, 0, 0, 0.6);
			font-size: 14px;
		}
        :hover {
            cursor: pointer;
        }
	}
	button.active {
		span {
			color: #0a66c2;
			font-weight: 600;
		}
		svg {
			fill: #0a66c2;
		}
	}
`;

const Comment = ({comment, profiles, profileIds}) => {
	const [commentActor, setCommentActor] = useState({});
	useEffect(() => {
		if(profiles && profileIds){
			const actorId = comment.id;
			const actorDetails = profiles[profileIds.indexOf(actorId)];
			setCommentActor(actorDetails);
		}
	}, [profiles, profileIds, comment]);
	return (
		<CommentDescription>
			<a>
				{commentActor.photoURL ? <img src={commentActor.photoURL} alt="" /> : <img src="/images/user.svg" alt="" />}
				<div>
				<span>{commentActor.displayName}</span>
				<span>{commentActor.headline}</span>
				{/* <span>{comment.date.toDate().toLocaleDateString()}</span> */}
				<span>{comment.description}</span>
			</div>
			</a>
		</CommentDescription>
	)
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Article(props) {
    const [showComments, toggleShowComments] = useState(false);
    const [showLikeForm, toggleShowLikeForm] = useState("close");
    const [showModal, setShowModal] = useState("close");
	const [articleActor, setArticleActor] = useState({});
	const adminIsSignedIn = props.user?.email === "ceo@linkedout.company";

	useEffect(() => {
		if(props.profiles && props.profileIds){
			const actorId = props.article.actor.id;
			const actorDetails = props.profiles[props.profileIds.indexOf(actorId)];
			setArticleActor(actorDetails);
		}
	}, [props.profiles, props.profileIds, props.article.actor]);

    const likedClickHandler = (event) => {
		event.preventDefault();
		if(!adminIsSignedIn){
			return;
		}
		switch (showLikeForm) {
			case "open":
				toggleShowLikeForm("close");
				break;
			case "close":
				toggleShowLikeForm("open");
				break;
			default:
				toggleShowLikeForm("close");
				break;
		}
	};

    const clickHandler = (event) => {
		event.preventDefault();
		if(!adminIsSignedIn){
			toggleShowComments(!showComments);
			return;
		}
		switch (showModal) {
			case "open":
				setShowModal("close");
				break;
			case "close":
				toggleShowComments(true);
				setShowModal("open");
				break;
			default:
				setShowModal("close");
				break;
		}
	};

    return (
        <ArticleStyle>
        <SharedActor>
            <a>
                {articleActor.photoURL ? <img src={articleActor.photoURL} alt="" /> : <img src="/images/user.svg" alt="" />}
                <div>
                    <span>{articleActor.displayName}</span>
                    <span>{articleActor.headline}</span>
                    <span>{props.article.actor.date.toDate().toLocaleDateString()}</span>
                </div>
            </a>
            <button>
                <img src="/images/ellipses.svg" alt="" />
            </button>
        </SharedActor>
        <Description>{props.article.description}</Description>
        <SharedImage>
            <a>{!props.article.sharedImg && props.article.video ? <ReactPlayer width={"100%"} url={props.article.video} /> : props.article.sharedImg && <img src={props.article.sharedImg} alt="" />}</a>
        </SharedImage>
        <SocialCount>
            {((props.article.comments.length > 0) || (props.article.likes.count > 0)) && (
                <>
                    <li onClick={likedClickHandler}>
							<LikeAndCommentButtons>
								<img src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb" alt="" />
								{/* <img src="https://static-exp1.licdn.com/sc/h/7fx9nkd7mx8avdpqm5hqcbi97" alt="" /> */}
								<span>{props.article.likes.count === 0 ? "" : numberWithCommas(props.article.likes.count)}</span>
							</LikeAndCommentButtons>
                    </li>
                    <li>
                        <LikeAndCommentButtons onClick={()=>{toggleShowComments(!showComments)}}>
                            <a>{props.article.comments?.length} comments</a>
                        </LikeAndCommentButtons>
                    </li>
                </>
            )}
        </SocialCount>
        <SocialActions>
            <button onClick={likedClickHandler} className={props.article.likes.whoLiked.indexOf(props.user.email) >= 0 ? "active" : null}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="rgba(0, 0, 0, 0.6)" width="24" height="24" focusable="false">
                    <path d="M19.46 11l-3.91-3.91a7 7 0 01-1.69-2.74l-.49-1.47A2.76 2.76 0 0010.76 1 2.75 2.75 0 008 3.74v1.12a9.19 9.19 0 00.46 2.85L8.89 9H4.12A2.12 2.12 0 002 11.12a2.16 2.16 0 00.92 1.76A2.11 2.11 0 002 14.62a2.14 2.14 0 001.28 2 2 2 0 00-.28 1 2.12 2.12 0 002 2.12v.14A2.12 2.12 0 007.12 22h7.49a8.08 8.08 0 003.58-.84l.31-.16H21V11zM19 19h-1l-.73.37a6.14 6.14 0 01-2.69.63H7.72a1 1 0 01-1-.72l-.25-.87-.85-.41A1 1 0 015 17l.17-1-.76-.74A1 1 0 014.27 14l.66-1.09-.73-1.1a.49.49 0 01.08-.7.48.48 0 01.34-.11h7.05l-1.31-3.92A7 7 0 0110 4.86V3.75a.77.77 0 01.75-.75.75.75 0 01.71.51L12 5a9 9 0 002.13 3.5l4.5 4.5H19z"></path>
                </svg>
                <span>Like</span>
            </button>
            <button onClick={clickHandler}>
                <img id="commentButton" src="/images/comment-icon.svg" alt="" />
                <span>Comment</span>
            </button>
            <button>
                <img src="/images/share-icon.svg" alt="" />
                <span>Share</span>
            </button>
            <button>
                <img src="/images/send-icon.svg" alt="" />
                <span>Send</span>
            </button>
        </SocialActions>
        {showComments && (props.article.comments.length > 0) && (
            props.article.comments.map((comment, key) => (
                <Comment key={key} comment={comment} profiles={props.profiles} profileIds={props.profileIds} />
            ))
        )}
		<CommentModal showModal={showModal} clickHandler={clickHandler} article={props.article} articleId={props.articleId} />
		<LikedModal showModal={showLikeForm} clickHandler={likedClickHandler} article={props.article} articleId={props.articleId}/>
    </ArticleStyle>
    )
}

const mapStateToProps = (state) => {
	return {
		profiles: state.profileState.profiles,
		profileIds: state.profileState.ids
	};
};

const mapDispatchToProps = (dispatch) => ({
    updateLike: (payload) => dispatch(updateArticleAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Article);
