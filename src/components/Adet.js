import React from "react";
import { Button } from "reactstrap";

const Adet = () => {
  return (
    <div className="pizza-adet">
      <Button color="warning" type="submit">
        +
      </Button>
      <div className="adet-sayisi">
        <p>1</p>
      </div>
      <Button color="warning" type="submit">
        -
      </Button>
    </div>
  );
};

export default Adet;
