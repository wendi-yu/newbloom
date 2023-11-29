import ExampleDocument from "@/assets/example_document";
import { randomDate } from "./util_functions";


const AllDocs = () => {
    const docs = [...Array(15).keys()].map((i) => {
        return {
            id: i,
            name: 'doc ' + i,
            dateLastModified: randomDate(new Date(2012, 0, 1), new Date()),
            owner: i,
            body: ExampleDocument
        }
    })

    return docs
}

export default AllDocs()
