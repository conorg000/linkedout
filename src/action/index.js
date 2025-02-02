import db, { auth, provider, storage } from "../firebase";
import { defaultUser } from "../reducers/userReducer";
import { SET_LOADING_STATUS, SET_USER, GET_ARTICLES, GET_PROFILES } from "./actionType";

const chatbergPhotoURL = "/images/chatbergh.jpeg";
const chatbergDisplayName = "chatberg";

export function setUser(payload) {
	return {
		type: SET_USER,
		user: payload,
	};
}

export function setLoading(status) {
	return {
		type: SET_LOADING_STATUS,
		status: status,
	};
}

export function getArticles(payload, id) {
	return {
		type: GET_ARTICLES,
		payload: payload,
		id: id,
	};
}

export function getProfiles(payload, id) {
	return {
		type: GET_PROFILES,
		payload: payload,
		id: id,
	};
}

export function getUserAuth() {
	return (dispatch) => {
		auth.onAuthStateChanged(async (user) => {
			if (user) {
				dispatch(setUser({...user, photoURL: chatbergPhotoURL, displayName: chatbergDisplayName}));
			}
		});
	};
}

export function signInAPI(email, password) {
	// return (dispatch) => {
	// 	auth.signInWithPopup(provider)
	// 		.then((payload) => dispatch(setUser(payload.user)))
	// 		.catch((err) => alert(err.message));
	// };
	return (dispatch) => {
		auth.signInWithEmailAndPassword(email, password)
			.then((payload) => {
				dispatch(setUser({...payload.user, photoURL: chatbergPhotoURL, displayName: chatbergDisplayName}));
			})
			.catch((err) => alert(err.message));
	};
}

export function signOutAPI() {
	return (dispatch) => {
		auth.signOut()
			.then(() => dispatch(setUser(defaultUser)))
			.catch((err) => alert(err.message));
	};
}

export function postArticleAPI(payload) {
	return (dispatch) => {
		if (payload.image !== "") {
			dispatch(setLoading(true));
			const upload = storage.ref(`images/${payload.image.name}`).put(payload.image);
			upload.on(
				"state_changed",
				(snapshot) => {
					const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				},
				(err) => alert(err),
				async () => {
					const downloadURL = await upload.snapshot.ref.getDownloadURL();
					db.collection("articles").add({
						actor: {
							id: payload.user,
							date: payload.timestamp,
						},
						video: payload.video,
						sharedImg: downloadURL,
						likes: {
							count: 0,
							whoLiked: [],
						},
						comments: [],
						description: payload.description,
					});
					dispatch(setLoading(false));
				}
			);
		} else if (payload.video) {
			dispatch(setLoading(true));
			db.collection("articles").add({
				actor: {
					id: payload.user,
					date: payload.timestamp,
				},
				video: payload.video,
				sharedImg: "",
				likes: {
					count: 0,
					whoLiked: [],
				},
				comments: [],
				description: payload.description,
			});
			dispatch(setLoading(false));
		} else if (payload.image === "" && payload.video === "") {
			dispatch(setLoading(true));
			db.collection("articles").add({
				actor: {
					id: payload.user,
					date: payload.timestamp,
				},
				video: "",
				sharedImg: "",
				likes: {
					count: 0,
					whoLiked: [],
				},
				comments: [],
				description: payload.description,
			});
			dispatch(setLoading(false));
		}
	};
}

export function getArticlesAPI() {
	return (dispatch) => {
		dispatch(setLoading(true));
		let payload;
		let id;
		db.collection("articles")
			.orderBy("actor.date", "desc")
			.onSnapshot((snapshot) => {
				payload = snapshot.docs.map((doc) => doc.data());
				id = snapshot.docs.map((doc) => doc.id);
				dispatch(getArticles(payload, id));
			});
		dispatch(setLoading(false));
	};
}

export function updateArticleAPI(payload) {

	return (dispatch) => {
		db.collection("articles").doc(payload.id).update(payload.update);
	};
}

export function getProfilesAPI() {
	return (dispatch) => {
		dispatch(setLoading(true));
		let payload;
		let id;
		db.collection("profiles")
			.orderBy("displayName", "desc")
			.onSnapshot((snapshot) => {
				payload = snapshot.docs.map((doc) => doc.data());
				id = snapshot.docs.map((doc) => doc.id);
				dispatch(getProfiles(payload, id));
			});
		dispatch(setLoading(false));
	};
}

export function createProfileAPI(payload) {
	return (dispatch) => {
		dispatch(setLoading(true));
		db.collection("profiles").add(payload);
		dispatch(setLoading(false));
	}
}
