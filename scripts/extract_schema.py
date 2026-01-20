import pdfplumber
import json
import re
import os

PDF_PATH = os.path.abspath("E-Tour_FinalDB - DB_Schema.pdf")
OUTPUT_JSON = os.path.abspath("extracted_schema.json")

def clean_text(text):
    return re.sub(r"\s+", " ", text or "").strip()

def extract_schema():
    schema = {}
    with pdfplumber.open(PDF_PATH) as pdf:
        for page in pdf.pages:
            tables = page.extract_tables()
            for table in tables:
                if not table or len(table) < 2:
                    continue
                headers = [clean_text(h) for h in table[0]]
                # Simple heuristic: if first header contains 'Table' or 'Column'
                if any('table' in h.lower() for h in headers) or any('column' in h.lower() for h in headers):
                    current_table = None
                    for row in table[1:]:
                        row = [clean_text(cell) for cell in row]
                        if not any(row):
                            continue
                        # New table name row: first column non‑empty, others empty
                        if row[0] and all(not c for c in row[1:]):
                            current_table = row[0]
                            schema[current_table] = []
                        elif current_table:
                            col_info = {
                                "name": row[0],
                                "type": row[1] if len(row) > 1 else "",
                                "primary_key": bool(re.search(r"PK", row[-1], re.IGNORECASE)),
                                "foreign_key": bool(re.search(r"FK", row[-1], re.IGNORECASE)),
                                "fk_reference": row[-1] if "FK" in row[-1] else ""
                            }
                            schema[current_table].append(col_info)
    return schema

if __name__ == "__main__":
    data = extract_schema()
    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
    print(f"Schema extracted to {OUTPUT_JSON}")
