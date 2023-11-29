import { getMarkForCommentThreadID } from "../utils/editorCommentUtils";
import { v4 as uuid } from "uuid";

const overlappingCommentThreadID = uuid();

// THERE ARE 4 types of redactions: suggested, rejected, accepted, current 
// To specify, just do rejected:true or etc

const ExampleDocument = [
  {
    type: "paragraph",
    children: [
      {
        text: "Text 1 ",
        suggested:true,
      },
      {
        text: "Text 2 ",
        [getMarkForCommentThreadID(overlappingCommentThreadID)]: true,
      },
      {
        text: "Text 3 ",
        accepted:true
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
        text:
          "Cras",
        current:true
      },
      {
        [getMarkForCommentThreadID(uuid())]: true,
        text:
          "maximus auctor congue. Sed ultrices elit quis tortor ornare, non gravida turpis feugiat. Morbi facilisis sodales sem quis feugiat. Vestibulum non urna lobortis, semper metus in, condimentum ex. Quisque est justo, egestas sit amet sem ac, auctor ultricies lacus. Pellentesque lorem justo, rhoncus ut magna sit amet, rhoncus posuere libero.",
      },
      {
        text:
          "Cras maximus auctor congue. Sed ultrices elit quis tortor ornare, non gravida turpis feugiat. Morbi facilisis sodales sem quis feugiat. Vestibulum non urna lobortis, semper metus in, condimentum ex. Quisque est justo, egestas sit amet sem ac, auctor ultricies lacus. Pellentesque lorem justo, rhoncus ut magna sit amet, rhoncus posuere libero.",
      },
    ],
  },
];

export default ExampleDocument;