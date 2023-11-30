import { getMarkForCommentThreadID } from "@/util/editorCommentUtils";
import { comments } from "./example_comments";

const overlappingCommentThreadID = comments[0].id;

const ExampleDocument = {
    children: [
        {
            type: "paragraph",
            children: [
                {
                    text: "Seedlings Life Science Ventures, LLC [Seedlings]",
                    [getMarkForCommentThreadID(comments[1].id)]: true,
                    suggested: true,
                },
                {
                    text: " is in the business of early-stage health-care related research and product development. It alleges that Pfizer Canada ULC [Pfizer]",
                    [getMarkForCommentThreadID(overlappingCommentThreadID)]: true,
                },
                {
                    text: ", a major pharmaceutical company, infringes its patent by selling in Canada an auto-injector commonly known as the EpiPen. While, at first sight, the EpiPen and Seedlings’s invention do",
                    [getMarkForCommentThreadID(overlappingCommentThreadID)]: true,
                    [getMarkForCommentThreadID(comments[2].id)]: true,
                    accepted: true,
                },
                {
                    text: "Text 4",
                    [getMarkForCommentThreadID(comments[3].id)]: true,
                }, {
                    text: " not look alike, Seedlings argues that the EpiPen infringes certain claims of its patent and seeks compensation and an accounting of profits.",
                    [getMarkForCommentThreadID(comments[3].id)]: true,
                },
                {
                    text:
                        " Pfizer denies that the EpiPen infringes upon Seedlings’s patent. Moreover, by way of counterclaim, it seeks a declaration that the claims of Seedlings’s patent asserted in this action are invalid.",
                },
                { text: " Pfizer argues that those claims are overly broad, obvious and anticipated by prior art.  It also argues that Seedlings has never demonstrated the utility of its invention." },
            ],
        },
        {
            type: "paragraph",
            children: [
                {
                    [getMarkForCommentThreadID(comments[4].id)]: true,
                    text:
                        "I agree with Pfizer that the claims asserted by Seedlings",
                    current: true,
                },
                {
                    text:
                        " are invalid, because they are all overly broad, some of them are anticipated and one of them is obvious. Moreover, had those claims been valid, I would have found that they are not infringed by the EpiPen. In so finding, I am not denying the creative value of Seedlings’s work. Indeed, I am invalidating only a subset of the claims of Seedlings’s patent. Contrary to Seedlings’s assertion, however, this is not a case of two inventors making the same invention independently, with Seedlings being the first in time to file its patent application.",
                },
            ],
        },
        {
            type: "paragraph",
            children: [
                {
                    [getMarkForCommentThreadID(comments[5].id)]: true,
                    text:
                        "Rather, Seedlings’s auto-injector and the EpiPen are different inventions. The creative use of language in Seedlings’s patent cannot obscure this reality.",
                },
                {
                    text:
                        " and the EpiPen are different inventions. The creative use of language in Seedlings’s patent cannot obscure this reality. Part I of this judgment describes the auto-injectors involved in this case. In Part II, I identify the skilled person to whom the patent is directed and I give my interpretation of certain terms of the patent, the meaning of which is in dispute. Part III is devoted to the analysis of Pfizer’s challenge to the validity of the patent’s relevant claims. I address the issues of anticipation, obviousness, utility, overbreadth and insufficiency. Even though I conclude that the relevant claims are invalid, I assess, in Part IV, whether the current version of the EpiPen infringes Seedlings’s patent. While I conclude that it does not, I also give my opinion, in Part V, as to the compensation that Pfizer would have owed to Seedlings if it had infringed valid claims.",
                },
            ],
        },
    ]
};

export default ExampleDocument;