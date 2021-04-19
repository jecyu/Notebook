<script>
// import React, { Component } from "react";
// import Comment from "./Comment";

export default {
  name: "CommentList",
  props: {
    comments: {
      type: Array,
      default: () => {},
    },
  },
  render() {
    return (
      <div>
        {this.comments.map((comment, i) => (
          <div>{comment}, {i}</div>
          // <Comment
          //   comment={comment}
          //   index={i}
          //   key={i}
          //   ononDeleteComment={this.handleDeleteComment.bind(this)}
          // />
        ))}
      </div>
    );
  },
};
// class CommentList extends Component {
//   static defaultProps = {
//     comments: [],
//   };

//   handleDeleteComment(index) {
//     if (this.props.onDeleteComment) {
//       this.props.onDeleteComment(index);
//     }
//   }

//   render() {
//     // const comments = [
//     //   {
//     //     username: "Jerry",
//     //     content: "Hello",
//     //   },
//     //   {
//     //     username: "Tomy",
//     //     content: "World",
//     //   },
//     //   {
//     //     username: "Lucy",
//     //     content: "Good",
//     //   },
//     // ];
//     return (
//       <div>
//         {this.props.comments.map((comment, i) => (
//           <Comment
//             comment={comment}
//             index={i}
//             key={i}
//             onDeleteComment={this.handleDeleteComment.bind(this)}
//           />
//         ))}
//       </div>
//     );
//   }
// }
// export default CommentList;
</script>
