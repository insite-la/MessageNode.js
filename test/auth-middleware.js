const expect = require("chai").expect;
const sinon = require("sinon");
const jwt = require("jsonwebtoken"); //need a reference of jwt
const authMiddleware = require("../middleware/is-auth");

describe("Auth middleware", () => {
	it("should throw an error if no authorization header is present", () => {
		const req = {
			get: (headerName) => null,
		};
		expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
			"Not authenticated"
		);
	});

	it("should yield a userId after decoding the token", () => {
		const req = {
			get: (headerName) => "Bearer asdasdsadasdjasdk",
		};
		sinon.stub(jwt, "verify");
		jwt.verify.returns({ userId: "abc" });
		authMiddleware(req, {}, () => {});
		expect(req).to.have.property("userId");
		expect(req).to.have.property("userId", "abc");
		expect(jwt.verify.called).to.be.true;
		jwt.verify.restore();
	});

	it("should thow an error if the authorization header is only one string", () => {
		const req = {
			get: (headerName) => "xyz",
		};
		expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
	});
});
