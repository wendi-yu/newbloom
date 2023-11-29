import { v4 as uuid } from "uuid";
import { randomDate } from "@/util/util_functions";

export const comments = [
    {
        id: uuid(),
        body: "Should we redact this? I'm not sure if it's unclear.",
        date: randomDate(new Date(2012, 0, 1), new Date()),
        userId: 0,
        replies: [
            {
                body: "I don't think so, we should be good.",
                date: randomDate(new Date(2012, 0, 1), new Date()),
                userId: 1
            },
            {
                body: "Ok, sounds good!",
                date: randomDate(new Date(2012, 0, 1), new Date()),
                userId: 0
            }
        ]
    },
    {
        id: uuid(),
        body: "Comment 2.",
        date: randomDate(new Date(2012, 0, 1), new Date()),
        userId: 0,
        replies: [
            {
                body: "Comment 2a.",
                date: randomDate(new Date(2012, 0, 1), new Date()),
                userId: 1
            },
            {
                body: "Comment 2b",
                date: randomDate(new Date(2012, 0, 1), new Date()),
                userId: 0
            }
        ]
    },
    {
        id: uuid(),
        body: "Comment 3.",
        date: randomDate(new Date(2012, 0, 1), new Date()),
        userId: 0,
        replies: [
            {
                body: "Comment 3a.",
                date: randomDate(new Date(2012, 0, 1), new Date()),
                userId: 1
            },
            {
                body: "Comment 3b",
                date: randomDate(new Date(2012, 0, 1), new Date()),
                userId: 0
            }
        ]
    },
    {
        id: uuid(),
        body: "Comment 4.",
        date: randomDate(new Date(2012, 0, 1), new Date()),
        userId: 0,
        replies: [
            {
                body: "Comment 4a.",
                date: randomDate(new Date(2012, 0, 1), new Date()),
                userId: 1
            },
            {
                body: "Comment 4b",
                date: randomDate(new Date(2012, 0, 1), new Date()),
                userId: 0
            }
        ]
    },
    {
        id: uuid(),
        body: "Comment 5.",
        date: randomDate(new Date(2012, 0, 1), new Date()),
        userId: 0,
        replies: [
            {
                body: "Comment 5a.",
                date: randomDate(new Date(2012, 0, 1), new Date()),
                userId: 1
            },
            {
                body: "Comment 5b",
                date: randomDate(new Date(2012, 0, 1), new Date()),
                userId: 0
            }
        ]
    },
    {
        id: uuid(),
        body: "Comment 6.",
        date: randomDate(new Date(2012, 0, 1), new Date()),
        userId: 0,
        replies: [
            {
                body: "Comment 6a.",
                date: randomDate(new Date(2012, 0, 1), new Date()),
                userId: 1
            },
            {
                body: "Comment 6b",
                date: randomDate(new Date(2012, 0, 1), new Date()),
                userId: 0
            }
        ]
    }
]