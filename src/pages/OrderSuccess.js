import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="container text-center mt-5">
      <h2 className="text-success">Order Placed Successfully!</h2>
      <p>Your order has been placed. We will contact you soon.</p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
  );
};

export default OrderSuccess;
