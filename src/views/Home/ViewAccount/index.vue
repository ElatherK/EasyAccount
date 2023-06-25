<template>
  <div class="container">
    <a-collapse v-model="activeKey">
      <a-collapse-panel
        v-for="(mounth) in accounts"
        :key="mounth.mounth+''"
        :header="mounthMap[mounth.mounth]"
      >
        <ul>
          <li v-for="(item, idx) in mounth.items" :key="idx">
            <div class="item-con">
              <div class="item-header">
                <span>{{ item.date }}</span>
              </div>
              <div class="item-content">
                <span class="content-name">{{ item.name }}</span>
                <div class="content-tags">
                  <a-tag v-for="tag in item.category" :key="tag">{{
                    categories[tag]
                  }}</a-tag>
                </div>
                <span
                  ><span>{{ item.type ? "-" : "+" }}</span
                  >{{ item.money }}元</span
                >
              </div>
            </div>
          </li>
        </ul>
      </a-collapse-panel>
      <!-- <a-collapse-panel key="1" header="This is panel header 1">
              <p>{{ text }}</p>
            </a-collapse-panel>
            <a-collapse-panel key="2" header="This is panel header 2" :disabled="false">
              <p>{{ text }}</p>
            </a-collapse-panel>
            <a-collapse-panel key="3" header="This is panel header 3" disabled>
              <p>{{ text }}</p>
            </a-collapse-panel> -->
    </a-collapse>
  </div>
</template>
<script>
import { mounthMap, categories } from "@/utils/const";
export default {
  name: "ViewAccount",
  data() {
    return {
      accounts: [
        {
          mounth: 4,
          items: [
            {
              date: "2023-04-01",
              name: "电费",
              type: 0,
              category: [1, 2],
              money: 100,
            },
            {
              date: "2023-04-02",
              name: "电费",
              type: 0,
              category: [1, 2],
              money: 100,
            },
            {
              date: "2023-04-03",
              name: "电费",
              type: 0,
              category: [1, 2],
              money: 100,
            },
            {
              date: "2023-04-04",
              name: "电费",
              type: 0,
              category: [1, 2],
              money: 100,
            },
          ],
        },
        {
          mounth: 5,
          items: [
            {
              date: "2023-05-01",
              name: "电费",
              type: 0,
              category: [1, 2],
              money: 100,
            },
            {
              date: "2023-05-02",
              name: "电费",
              type: 0,
              category: [1, 2],
              money: 100,
            },
            {
              date: "2023-05-03",
              name: "电费",
              type: 0,
              category: [1, 2],
              money: 100,
            },
            {
              date: "2023-05-04",
              name: "电费",
              type: 0,
              category: [1, 2],
              money: 100,
            },
          ],
        },
        {
          mounth: 6,
          items: [
            {
              date: "2023-04-01",
              name: "电费",
              type: 0,
              category: [1, 2],
              money: 100,
            },
            {
              date: "2023-04-02",
              name: "电费",
              type: 0,
              category: [1, 2],
              money: 100,
            },
            {
              date: "2023-04-03",
              name: "电费",
              type: 0,
              category: [1, 2],
              money: 100,
            },
            {
              date: "2023-04-04",
              name: "电费",
              type: 0,
              category: [1, 2],
              money: 100,
            },
          ],
        },
      ],
      mounthMap,
      categories,
      activeKey:[]
    };
  },
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  margin-top: 80px;
  padding-left: 72px;
  padding-right: 72px;
  ul {
    list-style: none;
    padding: 0px;
    margin: 0px;
  }
  li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
  .item-con {
    display: flex;
    padding-bottom: 10px;
    flex-direction: column;
    gap: 8px;
    .item-header {
      display: flex;
    }
    .item-content {
      display: flex;
      justify-content: space-between;
      .content-name {
        width: 50%;
        text-align: left;
        margin-left: 20px;
      }
      .content-tags {
      }
    }
  }
}
</style>