const Meeting = require("../models/meeting");
// const Note = require("../models/note");

module.exports = {
  index,
  new: newMeeting,
  create,
  show,
  delete: deleteMeeting,
  edit,
  update,
};

function index(req, res) {
  Meeting.find({}, function (err, meetings) {
    res.render("meetings/index", { title: "All Meetings", meetings });
  });
}

function newMeeting(req, res) {
  const newMeeting = new Meeting();
  const mt = newMeeting.meetingDate;
  const mtgDate = mt.toISOString().slice(0, 16);
  res.render("meetings/new", { title: "Add Meeting", mtgDate });
}

function create(req, res) {
  //   req.body.user = req.user._id
  console.log(req.body);
  const meeting = new Meeting(req.body);
  meeting.save(function (err) {
    if (err) {
      return res.redirect("/meetings/new");
    }
    res.redirect("/meetings");
  });
}

function deleteMeeting(req, res) {
  Meeting.findByIdAndDelete(req.params.id, function (err) {
    if (err) console.log("Error in deleteMeeting function!");
    res.redirect("/meetings");
  });
}

function edit(req, res) {
  Meeting.findById(req.params.id, function (err, meeting) {
    if (err) {
      res.redirect(`/meetings/${req.params.id}`);
    }
    res.render("meetings/edit", {
      meeting,
      title: "Edit Meeting",
      mtgDate: meeting.meetingDate.toISOString().slice(0, 16),
    });
  });
}

function update(req, res) {
  Meeting.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (
    err,
    meeting
  ) {
    if (err) {
      res.render("meetings/edit", {
        meeting,
        title: "Edit Meeting",
        mtgDate: meeting.meetingDate.toISOString().slice(0, 16),
      });
    }
    res.redirect(`meetings`);
  });
}

function show(req, res) {
  Meeting.findById(req.params.id, function (err, meeting) {
    res.render("meetings/show", {
      title: "Meeting Details",
      meeting,
    });
  });
}
