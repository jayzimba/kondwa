import Tenderlisting from "./Tenderlisting";

const mapStateToProps = (state) => ({
  customer: state.customer, // Map the customer state to the customer prop
});

export default connect(mapStateToProps)(Tenderlisting);
