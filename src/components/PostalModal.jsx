import { useState } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import Firebase from "firebase";
import styled from "styled-components";
import { createProfileAPI, postArticleAPI } from "../action";

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

const handleSubmit = (event, createProfileMethod) => {
	event.preventDefault();
	const newProfile = {
		displayName: event.target.displayName.value,
		email: event.target.email.value,
		headline: event.target.headline.value,
		photoURL: event.target.photoURL.value,
	}
	createProfileMethod(newProfile);
}	

const CreateProfileForm = ({createProfileMethod}) => {
	return (
		<form className="form" onSubmit={(event) => handleSubmit(event, createProfileMethod)}>
			<div className="input-group">
				<label htmlFor="displayName">Full name</label>
				<input type="text" name="displayName" placeholder="Bob Burnquist" />
			</div>
			<div className="input-group">
				<label htmlFor="email">Email (can just make it up)</label>
				<input type="email" name="email" placeholder="nome@email.com.br" />
			</div>
			<div className="input-group">
				<label htmlFor="headline">Headline (e.g. "Drug Dealer", "Martian Rights Activist")</label>
				<input type="text" name="headline" placeholder="I sell drugs FAST" />
			</div>
			<div className="input-group">
				<label htmlFor="photoURL">Photo (Copy paste the link of a pic on the internet. For non-famous people, I'd suggest using https://this-person-does-not-exist.com/en)</label>
				<input type="url" name="photoURL" placeholder="https://i.pinimg.com/originals/a2/4c/16/a24c161fea2b24bd5967337d1684ff21.jpg" />
			</div>
			<button className="primary">Create Profile (and then find Profile in dropdown)</button>
		</form>
	)
}

function PostalModal(props) {
	const [editorText, setEditorText] = useState("");
	const [imageFile, setImageFile] = useState("");
	const [videoFile, setVideoFile] = useState("");
	const [assetArea, setAssetArea] = useState("");
	const [selectedProfile, setSelectedProfile] = useState({});
	const [selectedProfileId, setSelectedProfileId] = useState("");

	const reset = (event) => {
		setEditorText("");
		setImageFile("");
		setVideoFile("");
		setAssetArea("");
		props.clickHandler(event);
	};

	function handleImage(event) {
		let image = event.target.files[0];

		if (image === "" || image === undefined) {
			alert(`Not an image. This file is: ${typeof imageFile}`);
			return;
		}
		setImageFile(image);
	}

	function switchAssetArea(area) {
		setImageFile("");
		setVideoFile("");
		setAssetArea(area);
	}

	function postArticle(event) {
		event.preventDefault();
		if (event.target !== event.currentTarget) {
			return;
		}

		const payload = {
			image: imageFile,
			video: videoFile,
			description: editorText,
			user: selectedProfileId,
			timestamp: Firebase.firestore.Timestamp.now(),
		};

		props.postArticle(payload);
		reset(event);
	}

	return (
		<>
			{props.showModal === "open" && (
				<Container>
					<Content>
						<Header>
							<h2>Create a post</h2>
							<button onClick={(event) => reset(event)}>
								<img src="/images/close-icon.svg" alt="" />
							</button>
						</Header>
						<SharedContent>
							<select 
							onChange={e => {
								setSelectedProfile(e.target.value == "" ? {} : props.profiles[e.target.value]);
								setSelectedProfileId(e.target.value == "" ? {} : props.profileIds[e.target.value]);
							}}
							>
								<option key={-1} value={""}>Create a profile to post with</option>
								{props.profiles.map((profile, index) => 
                                    <option key={index} value={index}>{profile.displayName}</option>
                                )}
							</select>
							{Object.keys(selectedProfile).length == 0 && <CreateProfileForm createProfileMethod={props.createProfile}/>}
							<UserInfo>
								{Object.keys(selectedProfile).length > 0 ? <img src={selectedProfile.photoURL} alt="" /> : <img src="/images/user.svg" alt="" />}
								<span>{Object.keys(selectedProfile).length > 0 ? selectedProfile.displayName : "Name"}</span>
							</UserInfo>
							<p>{Object.keys(selectedProfile).length > 0 ? selectedProfile.headline : ""}</p>
							<Editor>
								<textarea value={editorText} onChange={(event) => setEditorText(event.target.value)} placeholder="What do you want to talk about?" autoFocus={true} />

								{assetArea === "image" ? (
									<UploadImage>
										<input type="file" accept="image/gif, image/jpeg, image/png" name="image" id="imageFile" onChange={handleImage} style={{ display: "none" }} />
										<p>
											<label htmlFor="imageFile">Select an image to share</label>
										</p>
										{imageFile && <img src={URL.createObjectURL(imageFile)} alt="" />}
									</UploadImage>
								) : (
									assetArea === "video" && (
										<>
											<input
												type="text"
												name="video"
												id="videoFile"
												value={videoFile}
												placeholder="Enter the video link"
												onChange={(event) => setVideoFile(event.target.value)}
											/>
											{videoFile && <ReactPlayer width={"100%"} url={videoFile} />}
										</>
									)
								)}
							</Editor>
						</SharedContent>
						<ShareCreation>
							{/* 
							Firebase storage is not currently working for images and videos
							<AttachAsset>
								<AssetButton onClick={() => switchAssetArea("image")}>
									<img src="/images/share-image.svg" alt="" />
								</AssetButton>
								<AssetButton onClick={() => switchAssetArea("video")}>
									<img src="/images/share-video.svg" alt="" />
								</AssetButton>
							</AttachAsset>
							<ShareComment>
								<AssetButton>
									<img src="/images/share-comment.svg" alt="" />
									<span>Anyone</span>
								</AssetButton>
							</ShareComment> */}
							<PostButton disabled={(!editorText || Object.keys(selectedProfile).length == 0) ? true : false} onClick={(event) => postArticle(event)}>
								Post
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
		profiles: state.profileState.profiles,
		profileIds: state.profileState.ids
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		postArticle: (payload) => dispatch(postArticleAPI(payload)),
		createProfile: (payload) => dispatch(createProfileAPI(payload))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PostalModal);
