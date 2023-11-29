import AllDocs from "@/util/test_documents";

/*
    Gets all information on all docs
*/
const getAllDocs = () => {
    return AllDocs
}

/*
    Gets ids, name, and dateLastModified (and other metadata) info about all docs
*/
const getAllDocsMetadata = () => {
    return AllDocs.map(doc => {
        var docMetadata = doc
        delete docMetadata['body']
        return docMetadata
    })
    //Note: When backend is setup, this should only call the api and return doc metadata
}

/*
    Get full document given its id
*/
const getDocById = (id) => {
    return AllDocs.find((e) => {
        return e.id == id;
    })
}

export default {
    getAllDocs,
    getAllDocsMetadata,
    getDocById
}