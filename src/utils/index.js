export function getBalance(statements) {
  const balance = statements.reduce((acc, statement) => {
    if (statement.type === "credit") {
      return acc + statement.amount;
    } else {
      return acc - statement.amount;
    }
  }, 0);

  return balance;
}
