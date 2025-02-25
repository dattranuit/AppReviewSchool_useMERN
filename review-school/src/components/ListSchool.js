import React, { useEffect, useState } from "react";
import * as rb from "react-bootstrap";
import "./ListSchool.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../redux/actions.js";
import * as func from "../funcGlobal.js";
import Loading from "./Loading.js";
import { apiLocal } from "../dataGlobal.js";

const ListSchool = () => {
  const email = useSelector((state) => state.email);
  const token = useSelector((state) => state.token);

  const [user, setUser] = useState({});

  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const axiosData = async () => {
      const result = await axios.get(`${apiLocal}/api/schools`);
      setData(result.data);
      setLoading(false);
    };
    axiosData();
    func.scrollTop();
  }, []);

  useEffect(() => {
    const axiosData = async () => {
      const result = await axios.get(`${apiLocal}/api/users/email/${email}`);
      setUser(result.data);
      dispatch(action.setUser(result.data));
      console.log(result.data);
    };
    axiosData();
  }, [email, token]);

  const goReview = (id) => {
    dispatch(action.setIdSchool(id));
    func.scrollTop();
  };

  return loading ? (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "500px" }}
    >
      <Loading />
    </div>
  ) : (
    <div
      className="d-flex flex-column align-items-center"
      style={{ marginTop: "80px" }}
    >
      {data.map((item, index) => (
        <rb.Card
          className="hover-shadow"
          style={{ width: "70%", margin: "16px 0 16px 0", padding: "20px" }}
          key={index}
          onClick={() => goReview(item._id)}
        >
          <Link
            to={`/schools/${item._id}/reviews`}
            className="d-flex flex-row"
            style={{ textDecoration: "none" }}
          >
            <rb.Card.Img
              src={item.images[0]}
              className="school-img"
            ></rb.Card.Img>
            <rb.Card.Body style={{ margin: "0" }}>
              <rb.Card.Text
                className="school-name"
                style={{ fontSize: "21px", fontWeight: "700" }}
              >
                {item.name}
              </rb.Card.Text>
              <rb.Card.Text>
                <span style={{ fontWeight: "500", fontSize: "19px" }}>
                  Mã trường :{" "}
                </span>
                <span style={{ fontSize: "16px", fontWeight: "normal" }}>
                  {item.code}
                </span>
              </rb.Card.Text>
              <rb.Card.Text className="school-name">
                <span style={{ fontWeight: "500", fontSize: "19px" }}>
                  Location:{" "}
                </span>
                {item.location}
              </rb.Card.Text>
              <a href={item.website} className="school-name">
                <span style={{ fontWeight: "500", fontSize: "19px" }}>
                  Website:{" "}
                </span>{" "}
                {item.website}
              </a>
              <div className="d-flex flex-row align-items-center">
                <rb.Badge
                  variant="success"
                  className="d-flex justify-content-center align-items-center school-badge"
                >
                  9.9
                </rb.Badge>
                <div>
                  <rb.Card.Text className="school-name">Tốt</rb.Card.Text>
                  <rb.Card.Text>n bài đánh giá</rb.Card.Text>
                </div>
              </div>
            </rb.Card.Body>
            <rb.Card.Img src={item.logo} className="school-logo"></rb.Card.Img>
          </Link>
        </rb.Card>
      ))}
    </div>
  );
};

export default ListSchool;
