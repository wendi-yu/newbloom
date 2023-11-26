import { getMarkForCommentThreadID } from "@/util/editorCommentUtils";
import { v4 as uuid } from "uuid";

const overlappingCommentThreadID = uuid();

const ExampleDocument = {
    children: [
        {
            type: "paragraph",
            children: [
                {
                    text: "Text 1",
                    [getMarkForCommentThreadID(uuid())]: true,
                },
                {
                    text: "Text 2",
                    [getMarkForCommentThreadID(overlappingCommentThreadID)]: true,
                },
                {
                    text: "Text 3",
                    [getMarkForCommentThreadID(overlappingCommentThreadID)]: true,
                    [getMarkForCommentThreadID(uuid())]: true,
                },
                {
                    text: "Text 4",
                    [getMarkForCommentThreadID(uuid())]: true,
                },
                {
                    text:
                        " in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                },
                { text: " massa." },
            ],
        },
        {
            type: "paragraph",
            children: [
                {
                    [getMarkForCommentThreadID(uuid())]: true,
                    text:
                        "Cras maximus auctor congue. Sed ultrices elit quis tortor ornare, non gravida turpis feugiat. Morbi facilisis sodales sem quis feugiat. Vestibulum non urna lobortis, semper metus in, condimentum ex. Quisque est justo, egestas sit amet sem ac, auctor ultricies lacus. Pellentesque lorem justo, rhoncus ut magna sit amet, rhoncus posuere libero.",
                },
                {
                    text:
                        "Cras maximus auctor congue. Sed ultrices elit quis tortor ornare, non gravida turpis feugiat. Morbi facilisis sodales sem quis feugiat. Vestibulum non urna lobortis, semper metus in, condimentum ex. Quisque est justo, egestas sit amet sem ac, auctor ultricies lacus. Pellentesque lorem justo, rhoncus ut magna sit amet, rhoncus posuere libero.",
                },
            ],
        },
    ]
};

export default ExampleDocument;