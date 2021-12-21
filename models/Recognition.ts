
export interface FaceDetected {
    faceId: string
    faceRectangle: {
        top: number
        left: number
        width: number
        height: number
    }
}

export interface FaceIdentified {
    faceId: string
    candidates: Array<{
        personId: string
        confidence: number
    }>
}