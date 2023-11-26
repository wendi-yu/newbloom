import ExampleDocument from "@/assets/example_document";


const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const AllDocs = () => {
    const docs = [...Array(5).keys()].map((i) => {
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
