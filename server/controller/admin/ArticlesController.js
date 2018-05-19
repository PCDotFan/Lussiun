"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Article_1 = require("../../entity/Article");
function index(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const articleRepository = typeorm_1.getManager().getRepository(Article_1.Article);
        const articles = yield articleRepository.find();
        context.body = articles;
    });
}
exports.index = index;
function destroy(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body } = context.request; // 拿到传入的参数
        const articleRepository = typeorm_1.getManager().getRepository(Article_1.Article);
        try {
            if (!body.id) {
                context.status = 400;
                context.body = { error: `无效的传入参数` };
                return;
            }
            const articleExisted = yield articleRepository.findOne({
                id: body.id
            }); // 同步处理
            if (articleExisted) {
                yield articleRepository.delete(body.id);
            }
            context.status = 200;
        }
        catch (error) {
            context.status = 500;
            context.body = { error: error };
        }
    });
}
exports.destroy = destroy;
function store(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body } = context.request; // 拿到传入的参数
        const articleRepository = typeorm_1.getManager().getRepository(Article_1.Article);
        try {
            if (!body.title || !body.slug || !body.content || !body.categoryId || !body.status) {
                context.status = 400;
                context.body = { error: `无效的传入参数` };
                return;
            }
            body.userId = context.state.user.id;
            const articleExisted = yield articleRepository.findOne({ slug: body.slug }); // 同步处理
            if (!articleExisted) {
                const newArticle = articleRepository.create(body);
                yield articleRepository.save(newArticle);
                context.status = 200;
                context.body = { message: '创建成功', newArticle };
            }
            else {
                context.status = 406;
                context.body = { message: '同别名文章已经存在' };
            }
        }
        catch (error) {
            context.status = 500;
            context.body = { error: error };
        }
    });
}
exports.store = store;
/*
  生成测试数据用

export async function mockData (context: Context) {
  let faker = require('faker')
  const count = 20
  const articleRepository = getManager().getRepository(Article)
  const admin = await getManager().getRepository(User).findOne({ id: 1 })
  const category = await getManager().getRepository(Category).findOne({ id: 17 })

  for (let i = 0; i <= count; i++) {
    let structure = {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
      status: getRandomInt(-1, 2),
      category: category,
      slug: faker.lorem.word(),
      user: admin
    }
    let newArticle = articleRepository.create(structure)
    await articleRepository.save(newArticle)
  }
}

function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min // The maximum is exclusive and the minimum is inclusive
}

*/