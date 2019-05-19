let id;
$(".img").on("click", event => {
  console.log(this);
  id = event.target.getAttribute("value");
  console.log("id", id);

  $("#articles").attr("class", "hide");
  $("#comments").removeClass("hide");

  $.get(`api/articles/${id}`).then(res => {
    displayComment(res);
    console.log(res);
  });
});

$("#submit").on("click", event => {
  const newComment = {
    name: $("#name").val(),
    username: $("#username").val(),
    comment: $("#comment").val()
  };
  console.log(newComment);

  $.post(`api/articles/${id}`, newComment).then(res => {
    console.log("success");
  });
});

const displayComment = data => {
  data.comment.forEach(comment => {
    const div = $("<div>").attr("class", "card");
    const header = $("<div>")
      .attr("class", "card-header")
      .text(comment.name);
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
    div.append(header, cardBody);
    $("#display-comments").append(div);
  });
};
