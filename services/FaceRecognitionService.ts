import axios from 'axios'

const URL = 'https://brazilsouth.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&recognitionModel=recognition_04&returnRecognitionModel=false&detectionModel=detection_03&faceIdTimeToLive=86400'

const KEY = '746174e4cb29414eb6e05dcbf84a5ae5'


export const test = async () => {
    const res = await axios.post(URL, {
        url: 'https://firebasestorage.googleapis.com/v0/b/events-photos-574f5.appspot.com/o/user-images%2Fpo7gGdTFqrTizjTBNQjETXBdemL2%2FScreenshot_20211218_225800_com.instagram.android.jpg?alt=media&token=ff6fd2fb-f97e-4f39-a15c-e31536cade4a'
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': KEY
        }
    })
    return res.data
}