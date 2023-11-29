import { comments } from "@/assets/example_comments"

export const getDocuments = () => {
    return comments
}

export const getCommentById = (id) => {
    return getDocuments().find(c => c.id === id)
}