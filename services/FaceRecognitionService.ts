import axios, { Method } from 'axios'
import { FaceDetected, FaceIdentified } from '../models/Recognition'

const ENDPOINT = 'https://event-photos-face-recognition.cognitiveservices.azure.com/face/v1.0'

const KEY = '746174e4cb29414eb6e05dcbf84a5ae5'

const headers = {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': KEY
}


const HttpRequest = async (method: Method, additionalPath?: string, data?: any): Promise<any> => {
    const url = `${ENDPOINT}/${additionalPath}`
    const res = await axios.request({
        method,
        headers,
        url,
        data
    })
    return res.data
}


export const detect = async (url: string): Promise<Array<FaceDetected>> => {
    const res = await HttpRequest('POST', 'detect?returnFaceId=true&returnFaceLandmarks=false&recognitionModel=recognition_04&returnRecognitionModel=false&detectionModel=detection_03&faceIdTimeToLive=86400', {
        url
    })
    return res
}


export const addPersonToGroup = async (personGroupId: string, name: string, userData?: string): Promise<string> => {
    const res = await HttpRequest('POST', `persongroups/${personGroupId}/persons`, {
        name,
        userData
    })
    return res.personId
}


export const addPersonFace = async (personGroupId: string, personId: string, url: string): Promise<string> => {
    const res = await HttpRequest('POST', `persongroups/${personGroupId}/persons/${personId}/persistedFaces?detectionModel=detection_03`, {
        url
    })
    return res
}


export const trainGroup = async (personGroupId: string) => {
    const res = await HttpRequest('POST', `persongroups/${personGroupId}/train`)
    return res
}


export const identify = async (personGroupId: string, faceIds: Array<string>): Promise<Array<FaceIdentified>> => {
    const res = await HttpRequest('POST', 'identify', {
        personGroupId,
        faceIds,
        maxNumOfCandidatesReturned: 1,
        confidenceThreshold: 0.5
    })
    return res
}
