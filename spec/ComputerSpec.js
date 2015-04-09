describe("Computer", function() {
  var computer;
  var script;

  beforeEach(function() {
    computer = new Computer();
    script = new Script();
  });

  it("should run scripts", function() {
    computer.run(script);
    expect(computer.running).toEqual(script);
  });
});
