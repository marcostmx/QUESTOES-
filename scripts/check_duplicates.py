# scripts/check_duplicates.py
import re
import json

def get_tokens(t):
    t = t.lower()
    words = re.findall(r'\b[a-záàâãéèêíïóôõöúçñ0-9]{3,}\b', t)
    return set(words)

def jaccard(s1, s2):
    if not s1 or not s2:
        return 0.0
    return len(s1 & s2) / len(s1 | s2)

def main():
    # Read existing questions from q1, q2, q3, q4
    existing_q = []
    for q_file in ["src/q1.ts", "src/q2.ts", "src/q3.ts", "src/q4.ts"]:
        with open(q_file, "r", encoding="utf-8") as f:
            content = f.read()
        matches = re.findall(r'text:\s*[`"\'](.*?)[`"\']\s*,', content, re.DOTALL)
        for m in matches:
            existing_q.append(m.strip())

    
    print(f"Total existing questions: {len(existing_q)}")

    # Read new questions
    new_q = []
    for nf in ["src/fisio_176_cv.ts", "src/fisio_176_resp.ts", "src/fisio_176_endo.ts", "src/fisio_176_renal_dig.ts"]:
        with open(nf, "r", encoding="utf-8") as f:
            data_str = f.read()
            idx = data_str.find("[")
            last_idx = data_str.rfind("]")
            items = json.loads(data_str[idx:last_idx+1])
            for it in items:
                new_q.append(it["text"])

    print(f"Total new questions: {len(new_q)}")

    # Check duplicates between new and existing
    exact = []
    high = []

    for i, nq in enumerate(new_q):
        t_nq = get_tokens(nq)
        for j, eq in enumerate(existing_q):
            t_eq = get_tokens(eq)
            jac = jaccard(t_nq, t_eq)
            if jac == 1.0:
                exact.append((i+1, nq[:80], j+1, eq[:80]))
            elif jac >= 0.65:
                high.append((i+1, nq[:80], j+1, eq[:80], jac))

    print("\n--- EXACT DUPLICATES (New vs Existing) ---")
    if not exact:
        print("None! No exact duplicate questions found.")
    else:
        for e in exact:
            print(f"New #{e[0]} vs Old #{e[2]}:\n  New: {e[1]}\n  Old: {e[3]}")

    print("\n--- HIGH SIMILARITY / OVERLAPPING THEMES (Jaccard >= 65%) ---")
    if not high:
        print("None with Jaccard >= 65%.")
    else:
        for h in high:
            print(f"New #{h[0]} vs Old #{h[2]} (Similarity: {h[4]:.1%}):\n  New: {h[1]}\n  Old: {h[3]}")

    # Internal duplicates in new questions
    internal = []
    for i in range(len(new_q)):
        t_i = get_tokens(new_q[i])
        for j in range(i+1, len(new_q)):
            t_j = get_tokens(new_q[j])
            jac = jaccard(t_i, t_j)
            if jac >= 0.70:
                internal.append((i+1, j+1, jac, new_q[i][:60], new_q[j][:60]))

    print(f"\n--- INTERNAL SIMILARITY IN NEW 176 QUESTIONS (>= 70%) ---")
    if not internal:
        print("None! All 176 questions are distinct.")
    else:
        for item in internal:
            print(f"#{item[0]} vs #{item[1]} ({item[2]:.1%}): {item[3]} | {item[4]}")

if __name__ == "__main__":
    main()
