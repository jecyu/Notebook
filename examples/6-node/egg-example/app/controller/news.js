const Controller = require("egg").Controller;

class NewsController extends Controller {
  async list() {
    const { ctx } = this;
    const page = ctx.query.page || 1;
    const newsList = await ctx.service.news.list(page);
    await this.ctx.render("news/list.tpl", newsList);
  }
}

module.exports = NewsController;
