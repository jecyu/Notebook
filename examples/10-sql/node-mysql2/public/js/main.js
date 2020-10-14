$(function() {
  $("form").submit(function(ev) {
    ev.preventDefault();
    const form = $(this);
    $.ajax({
      url: form.attr("action"),
      type: "POST",
      data: form.serialize(),
      success: function(obj) {
        const el = $("<li>");
        if ($("#projects-list").length) { // add new project.
          el.append(
            $("<a>")
              .attr("href", `/project/${obj.id}/tasks`)
              .text(obj.title + " ")
          ).append(
            $("<a>")
              .attr("href", `/project/${obj.id}`)
              .attr("class", "delete")
              .text("x")
          );
        } else { // add new task.
          el.append($("<span>").text(obj.title + " ")).append(
            $("<a>")
              .attr("href", `/task/${obj.id}`)
              .attr("class", "delete")
              .text("x")
          );
        }
        $("ul").append(el);
      },
    });
    form.find("input").val(""); // clear the input
  });

  // delete logic
  $("ul").delegate("a.delete", "click", function(ev) {
    ev.preventDefault(); // avoid redirects.
    const li = $(this).closest("li");
    $.ajax({
      url: $(this).attr("href"),
      type: "DELETE",
      success: function() {
        li.remove();
      },
    });
  });
});
