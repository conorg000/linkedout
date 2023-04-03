import db, { auth, provider, storage } from "../firebase";
import { defaultUser } from "../reducers/userReducer";
import { SET_LOADING_STATUS, SET_USER, GET_ARTICLES, GET_PROFILES } from "./actionType";

const chatbergPhotoURL = "https://scontent.fcmb2-2.fna.fbcdn.net/v/t1.15752-9/324408264_874646100250144_7121169071065042943_n.jpg?stp=dst-jpg_p100x100&_nc_cat=102&ccb=1-7&_nc_sid=4de414&_nc_eui2=AeFvNJ6wuW1TZ1gTT9o-iTHYdl4gf0Tnhux2XiB_ROeG7CbJvOkJadQ8eyu2Vuuw0D0&_nc_ohc=5RrcM9QJSiIAX-i-gPE&_nc_ht=scontent.fcmb2-2.fna&oh=03_AdRufm-i0pSUQcUaRUsotoA-rW0uqYgxNRedKcHp3uEVUA&oe=644522C4";
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
							description: payload.user.headline,
							title: payload.user.displayName,
							date: payload.timestamp,
							image: payload.user.photoURL,
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
					description: payload.user.headline,
					title: payload.user.displayName,
					date: payload.timestamp,
					image: payload.user.photoURL,
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
					description: payload.user.headline,
					title: payload.user.displayName,
					date: payload.timestamp,
					image: payload.user.photoURL,
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
