/* C11. 本地教学程序：前提、过程与边界一起展示。
 * a 指向至少 n 个有效 int；n==0 时允许 a==NULL。
 * 线性扫描求和、半开区间二分、稳定插入排序、链表指针操作。
 */
#include <assert.h>
#include <stddef.h>
#include <stdio.h>

/* 返回第一个不小于 key 的位置；输入必须非降序。 */
static size_t lower_bound(const int *a, size_t n, int key) {
    size_t left = 0, right = n; /* 候选区间 [left,right) */
    while (left < right) {
        size_t mid = left + (right - left) / 2;
        if (a[mid] < key) left = mid + 1;
        else right = mid;
    }
    return left; /* 可等于 n，调用者不能直接访问 a[n] */
}

static void insertion_sort(int *a, size_t n) {
    for (size_t i = 1; i < n; ++i) {
        int value = a[i];
        size_t j = i;
        while (j > 0 && a[j - 1] > value) {
            a[j] = a[j - 1];
            --j;
        }
        a[j] = value;
    }
}

struct Node { int value; struct Node *next; };
/* p 与 s 必须指向不同且存活的节点，s 尚未在链中。 */
static void insert_after(struct Node *p, struct Node *s) {
    s->next = p->next; /* 先保住原来的后继 */
    p->next = s;
}
/* 移除并返回后继，不释放由调用者拥有的节点。 */
static struct Node *remove_after(struct Node *p) {
    struct Node *q = p->next;
    if (q != NULL) { p->next = q->next; q->next = NULL; }
    return q;
}

int main(void) {
    int a[] = {3, 1, 2, 2};
    insertion_sort(a, 4);
    assert(a[0] == 1 && a[1] == 2 && a[2] == 2 && a[3] == 3);
    assert(lower_bound(a, 4, 2) == 1);
    assert(lower_bound(a, 4, 4) == 4);
    assert(lower_bound(NULL, 0, 2) == 0);
    insertion_sort(NULL, 0);
    int single[] = {7}; insertion_sort(single, 1);
    assert(lower_bound(single, 1, 6) == 0);
    struct Node b = {7, NULL}, head = {4, &b}, s = {5, NULL};
    insert_after(&head, &s);
    assert(head.next == &s && s.next == &b);
    assert(remove_after(&head) == &s && head.next == &b);
    assert(remove_after(&b) == NULL);
    int values[] = {2, 0, 5}; int sum = 0;
    for (size_t i = 0; i < 3; ++i) sum += values[i];
    assert(sum == 7);
    printf("sorted: %d %d %d %d; sum: %d\n", a[0], a[1], a[2], a[3], sum);
    return 0;
}
