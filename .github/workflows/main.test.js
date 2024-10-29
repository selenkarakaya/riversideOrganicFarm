it("computes the result of the expression", () => {
  const result = Calculator.compute("(21.5 x 2) - 1");

  expect(result).toBe(42);
});
