import json
import os
import spacy
import sys

# script that runs the ML model with spaCy. Expects one input argument, which is the entire text body of the document to be redacted as a string.

if len(sys.argv) != 2:
    raise Exception("Script takes exactly one argument: file body")

# cwd: backend
model_path = os.path.join(".", "src", "services", "ml_model", "model-best")

nlp_ner = spacy.load(model_path) 

to_redact = sys.argv[1]

doc = nlp_ner(to_redact)

# get the redaction list
redaction_objs = doc.to_json()["spans"]["sc"]

# deduplicate
dedup = {(int(obj["start"]), int(obj["end"])) for obj in redaction_objs}

# return redactions of form [{start: start_char_idx, end: end_char_idx}]
redactions = [{"start": tup[0], "end": tup[1]} for tup in dedup]

# communicate with calling JS file by dumping JSON string to output; JS will read in the string and deserialize it
print(json.dumps(redactions))
sys.stdout.flush()
