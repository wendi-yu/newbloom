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
        body: "Is this identifiable? Let me know what you think.",
        date: randomDate(new Date(2012, 0, 1), new Date()),
        userId: 0,
        replies: [
            {
                body: "I don't think it is, it would be a large stretch to get to a personal identity from just this information. Especially since it lacks context.",
                date: randomDate(new Date(2012, 0, 1), new Date()),
                userId: 1
            },
            {
                body: "Good call, ok sounds good.",
                date: randomDate(new Date(2012, 0, 1), new Date()),
                userId: 0
            }
        ]
    },
    {
        id: uuid(),
        body: "I think we should redact this, otherwise they might be able to link people from the name.",
        date: randomDate(new Date(2012, 0, 1), new Date()),
        userId: 0,
        replies: [
            {
                body: "Yes I agree, go for it.",
                date: randomDate(new Date(2012, 0, 1), new Date()),
                userId: 1
            },
            {
                body: "Sg!",
                date: randomDate(new Date(2012, 0, 1), new Date()),
                userId: 0
            }
        ]
    },
    {
        id: uuid(),
        body: "What counts as identifying in this case?",
        date: randomDate(new Date(2012, 0, 1), new Date()),
        userId: 0,
        replies: [
            {
                body: "We should avoid this.",
                date: randomDate(new Date(2012, 0, 1), new Date()),
                userId: 1
            },
            {
                body: "I think you're right.",
                date: randomDate(new Date(2012, 0, 1), new Date()),
                userId: 0
            }
        ]
    },
    {
        id: uuid(),
        body: "I'm going to send this out for more review, I think it would benefit from a second opinion.",
        date: randomDate(new Date(2012, 0, 1), new Date()),
        userId: 0,
        replies: [
            {
                body: "Ok yes sounds good, who will you ask?",
                date: randomDate(new Date(2012, 0, 1), new Date()),
                userId: 1
            },
            {
                body: "Not sure, maybe Mary. Will let you know.",
                date: randomDate(new Date(2012, 0, 1), new Date()),
                userId: 0
            }
        ]
    },
    {
        id: uuid(),
        body: "This might be identifying in conjunction with the redaction above.",
        date: randomDate(new Date(2012, 0, 1), new Date()),
        userId: 0,
        replies: [
            {
                body: "Which one?",
                date: randomDate(new Date(2012, 0, 1), new Date()),
                userId: 1
            },
            {
                body: "Where they talk about the patent?",
                date: randomDate(new Date(2012, 0, 1), new Date()),
                userId: 0
            }
        ]
    }
]