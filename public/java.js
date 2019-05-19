let id;
$(".img").on("click", event => {
  console.log(this);
  id = event.target.getAttribute("value");
  console.log("id", id);

  $("#articles").attr("class", "hide");
  $("#comments").removeClass("hide");

  $.get(`api/articles/${id}`).then(res => {
    if (res.comment.length !== 0) {
      const arr = res.comment;
      console.log("array", arr);
      arr.forEach(e => displayComment(e));
    } else if (res.comment.length === 1) {
      displayComment(res.comment);
    } else {
      $("#display-comments").empty();
    }
  });
});

$("#submit").on("click", event => {
  event.preventDefault();

  const newComment = {
    name: $("#name").val(),
    username: $("#username").val(),
    comment: $("#comment").val()
  };
  console.log(newComment);
  if (newComment.name && newComment.username && newComment.comment) {
    $.post(`api/articles/${id}`, newComment).then(res => {
      console.log("success ", res);
    });
    $.get(`api/articles/${id}`).then(res => {
      const last = res.comment.length - 1;

      displayComment(res.comment[last]);
    });
  } else {
    alert("You must fill out all the fields!");
  }
  $(".input-fields").val("");
});

const displayComment = comment => {
  const div = $("<div>").attr("class", "card");
  const header = $("<div>")
    .attr("class", "card-header")
    .text(comment.name);
  const cancel = $("<img>")
    .attr("src", "./images/delete-icon.png")
    .attr("class", "delete")
    .attr("value", comment._id);
  const cardBody = $("<div>").attr("class", "card-body");
  const blockquote = $("<blockquote>").attr("class", "blockquote mb-0");
  const p = $("<p>")
    .attr("class", "left")
    .text(comment.comment);
  const footer = $("<footer>")
    .attr("class", "blockquote-footer right")
    .text(comment.username);
  blockquote.append(p, footer);
  cardBody.append(blockquote);
  header.append(cancel);
  div.append(header, cardBody);
  $("#display-comments").append(div);

  deleteComment();
};

const deleteComment = () => {
  $(".delete").on("click", event => {
    let commentId = event.target.getAttribute("value");

    console.log("element", event.target);
    $.ajax({
      url: `/api/comments/${commentId}`,
      type: "DELETE",
      success: result => {
        console.log("Deleted!");
      }
    });
  });
};
