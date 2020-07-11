const fs = require("fs");
const data = require("../data.json");
const utils = require("../scripts/utils");

exports.post = (req, res) => {
  const urlEncoded = req.body;
  const keys = Object.keys(urlEncoded);

  for (const key of keys) {
    if (req.body[key] == "") {
      return res.send("Fill all the Fields");
    }
  }

  let {
    avatar_url,
    name,
    email,
    birth,
    cities,
    gender,
    activities,
  } = urlEncoded;

  const id = utils.positioningID(data.members);

  console.log(id);

  const created_at = Date.now();
  const birthDay = Date.parse(birth);

  data.members.push({
    id,
    avatar_url,
    name,
    email,
    birth: birthDay,
    age: Number(utils.age(birthDay)),
    cities,
    gender,
    activities,
    created_at,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return "Error Writting file";

    return res.redirect(`members/${id}`);
  });
};

exports.show = (req, res) => {
  const { id } = req.params;

  const findMember = data.members.find((member) => {
    if (member.id == id) return true;
  });

  if (!findMember) return res.send("Member not found!");

  const yearSubscription = new Date(findMember.created_at);

  const member = {
    ...findMember,
    activities: findMember.activities.split(","),
    birth: utils.formatBrowser(findMember.birth).birthday,
    created_at: yearSubscription.getFullYear(),
  };

  return res.render("members/show", { member });
};

exports.edit = (req, res) => {
  const { id } = req.params;

  const findMember = data.members.find((member) => {
    if (member.id == id) return true;
  });

  if (!findMember) return res.send("Member not found!");

  const member = {
    ...findMember,
    birth: utils.formatBrowser(findMember.birth).iso,
  };

  return res.render("members/edit", { member });
};

exports.put = (req, res) => {
  const urlEncoded = req.body;

  const { id } = urlEncoded;

  let foundIndex = 0;

  const findMember = data.members.find((member, index) => {
    if (member.id == id) {
      foundIndex = index;
      return true;
    }
  });

  if (!findMember) return res.send("Member not found!");

  data.members[foundIndex] = {
    ...findMember,
    ...urlEncoded,
    id: Number(urlEncoded.id),
    birth: Date.parse(urlEncoded.birth),
    age: Number(utils.age(urlEncoded.birth)),
  };

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return "Error Writting file";

    return res.redirect(`members/${id}`);
  });
};

exports.delete = (req, res) => {
  const urlEncoded = req.body;

  const { id } = urlEncoded;

  let filterOfMemberDeleted = data.members.filter((instructor) => {
    if (instructor.id != id) return true;

    return false;
  });

  data.members = filterOfMemberDeleted;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Error Write File!");

    return res.redirect("members");
  });
};
