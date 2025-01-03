# Perceptron Algorithm for Linear Function: `x1 → (x2 ∨ x3)`

The Perceptron algorithm is a fundamental linear classifier used to model binary relationships. This implementation focuses on the logical implication `x1 → (x2 ∨ x3)`

## 📚 Logical Breakdown

The logical function behaves as follows:

- If \( x_1 = 0 \): Output is always **True (1)**, regardless of \( x_2 \) or \( x_3 \).
- If \( x_1 = 1 \): Output depends on \( x_2 or x_3 \):
  - **True (1)** if \( x_2 = 1 \) or \( x_3 = 1 \).
  - **False (0)** if \( x_2 = 0 \) and \( x_3 = 0 \).

![image](https://github.com/user-attachments/assets/549c1d3e-d80a-4faf-bf23-f9761695331e)


